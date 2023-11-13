from flask import Flask, jsonify, request, make_response
from flask_cors import CORS, cross_origin
from pymongo import MongoClient
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from datetime import timedelta

client = MongoClient('mongodb://localhost:27017')
db = client.FullStackAssignment
collection = db.Users
pokemon_collection = db.pokemon


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SECRET_KEY'] = 'd6c4ec2866996c85ee2ac23c8276c88929caf7124b6beca896b866f6486f56d30e4ef81ff1b9eced0a4b81b4e93424765aa6'

bcrypt = Bcrypt(app)
jwt = JWTManager(app)

@cross_origin
@app.route('/api/v1.0/user', methods=['POST'])
def create_user():
    posted = request.get_json()
    hashed_password = bcrypt.generate_password_hash(posted['password']).decode('utf-8')

    check_if_user_exists = collection.find_one({'username': posted['username']})

    if not check_if_user_exists:
        user = {
            'username': posted['username'],
            'password': hashed_password,
            'decks':[],
        }
        collection.insert_one(user)
        access_token = create_access_token(identity=user['username'])
        response = make_response(jsonify({'msg': 'User successfully registered'}),200)
        expiration_time = timedelta(hours=1)
        response.set_cookie('access_token_cookie', value=access_token, httponly=True, secure=False, samesite='Strict', max_age=expiration_time.seconds)
        return response
    else:
        return make_response(jsonify({'msg': 'user already exists'}))

@cross_origin
@app.route('/api/v1.0/user/login', methods=['POST'])
def login_user():
    posted = request.get_json()
    found_user = collection.find_one({'username': posted['username']})

    if found_user:
        is_valid_password = bcrypt.check_password_hash(found_user['password'], posted['password'])

        if is_valid_password:
            return make_response(jsonify({'msg': 'logged in succesfully'}), 200)
        else:
            return make_response(jsonify({'msg': 'invalid credentials'}))
    else:
        return make_response(jsonify({"error": "User does not exist"}))
    
@app.route('/api/v1.0/users', methods=['GET'])
@jwt_required(locations=['cookies'])
def get_all_users():
    user_list = []
    users = collection.find({}, {'password': 0})

    for user in users:
        user['_id'] = str(user['_id'])
        user_list.append(user)
    return make_response(jsonify(user_list), 200)


@jwt_required
@cross_origin
@app.route('/api/v1.0/pokemon', methods=['GET'])
def get_all_pokemon():
    pokemon_list = []
    pokemon = pokemon_collection.find({})

    for poki in pokemon:
        poki['_id'] = str(poki['_id'])
        pokemon_list.append(poki)
    return make_response(jsonify(pokemon_list), 200)

@jwt_required
@cross_origin
@app.route('/api/v1.0/pokemon/<name>', methods=['GET'])
def get_pokemon_by_name(name):
    pokemon = pokemon_collection.find_one({'name': name})
    pokemon['_id'] = str(pokemon['_id'])
    return make_response(jsonify(pokemon))

if __name__ == '__main__':
    app.run(debug=True)