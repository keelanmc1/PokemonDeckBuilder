from flask import Flask, jsonify, request, make_response
from flask_cors import CORS, cross_origin
from pymongo import MongoClient
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, unset_jwt_cookies
from datetime import timedelta
from bson import ObjectId

client = MongoClient('mongodb://localhost:27017')
db = client.FullStackAssignment
collection = db.Users
pokemon_collection = db.Pokemon

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SECRET_KEY'] = 'd6c4ec2866996c85ee2ac23c8276c88929caf7124b6beca896b866f6486f56d30e4ef81ff1b9eced0a4b81b4e93424765aa6'

bcrypt = Bcrypt(app)
jwt = JWTManager(app)

@cross_origin
@app.route('/api/v1.0/user', methods=['POST'])
def create_user():
    posted = request.get_json()

    if 'username' in posted and  'password' in posted:
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
            response = make_response(jsonify({'msg': 'User successfully registered'}), 201)
            expiration_time = timedelta(hours=1)
            response.set_cookie('access_token_cookie', value=access_token, httponly=True, secure=False, samesite='Strict', max_age=expiration_time.seconds)
            return response
        else:
            return make_response(jsonify({'msg': 'user already exists'}), 400)
    else:
        return make_response(jsonify({'msg': 'Missing fields'}), 404)

@cross_origin
@app.route('/api/v1.0/user/login', methods=['POST'])
def login_user():
    posted = request.get_json()

    if 'username' in posted and 'password' in posted:
        found_user = collection.find_one({'username': posted['username']})

        if found_user:
            is_valid_password = bcrypt.check_password_hash(found_user['password'], posted['password'])

            if is_valid_password:
                access_token = create_access_token(identity=found_user['username'])
                response =  make_response(jsonify({'msg': 'logged in succesfully'}), 200)
                expiration_time = timedelta(hours=1)
                response.set_cookie('access_token_cookie', value=access_token, httponly=True, secure=False, samesite='Strict', max_age=expiration_time.seconds)
                response = make_response(jsonify({'access_token': access_token}))
                return response

            else:
                return make_response(jsonify({'msg': 'invalid credentials'}), 401)
        else:
            return make_response(jsonify({"error": "User does not exist"}), 409)
    else:
        return make_response(jsonify({'msg': 'Missing fields'}), 404)

@cross_origin
@app.route('/api/v1.0/pokemon', methods=['GET'])
@jwt_required()
def get_all_pokemon():
    current_user = get_jwt_identity()
    if current_user:
        pokemon_list = []
        pokemon = pokemon_collection.find({})

        for poki in pokemon:
            poki['_id'] = str(poki['_id'])
            pokemon_list.append(poki)
        return make_response(jsonify(pokemon_list), 200)
    else:
        return make_response(jsonify({'msg': 'Unauthorized access'}), 401)

@cross_origin
@app.route('/api/v1.0/pokemon/<name>', methods=['GET'])
@jwt_required()
def get_pokemon_by_name(name):
    if name:
        pokemon = pokemon_collection.find_one({'name': name})
        if pokemon:
            pokemon['_id'] = str(pokemon['_id'])
            return make_response(jsonify(pokemon), 200)
        else:
            return make_response(jsonify({'msg': 'Invalid pokemon'}), 404)
    else:
        return make_response(jsonify({'msg': 'missing name'}), 401)

@app.route('/api/v1.0/users/createDeck', methods=['POST'])
@jwt_required()
def create_deck():
    current_user = get_jwt_identity()
    
    user = collection.find_one({'username': current_user})
    if user:
        posted = request.get_json()

        if 'name' in posted and 'description' in posted:
            deck = {
                '_id': ObjectId(),
                'name': posted['name'],
                'description': posted['description'],
                'pokemon': []
            }

            collection.update_one({'username': current_user}, {'$push': {'decks': deck}})
            return make_response(jsonify({'msg': 'deck successfully posted'}), 200)
        else:
            return make_response(jsonify({'msg': 'name and description must be provided'}) , 400)
    else:
        return make_response(jsonify({'msg': 'Invalid user ID'}), 401)
    
@app.route('/api/v1.0/users/deck', methods=['GET'])
@jwt_required()
def get_all_decks():
    current_user_id = get_jwt_identity()
    deck_list = []
    result = collection.find_one({'username': current_user_id}, {"decks" : 1})

    if result:
        for deck in result['decks']:
            deck['_id'] = str(deck['_id'])
            deck_list.append(deck)
        return make_response(jsonify(deck_list), 200)
    else:
        make_response(jsonify({'msg': 'No decks retrieved'}), 204)

@app.route('/api/v1.0/users/deck/<deckId>', methods=['GET'])
@jwt_required()
def get_deck_by_id(deckId):
    current_user_id = get_jwt_identity()

    if current_user_id:
        user = collection.find_one({'username': current_user_id}, {"decks": 1})
        for deck in user["decks"]:
            if deck['_id'] == ObjectId(deckId):
                deck['_id'] = str(deck['_id'])
                return make_response(jsonify(deck), 200)
            
        return make_response(jsonify({"msg": "invalid deck ID"}), 404)
    else:
        return make_response(jsonify({'msg': 'Invalid credentials'}), 401)

@app.route('/api/v1.0/users/deck', methods=['GET'])
def get_all_user_decks():
    current_user = get_jwt_identity()
    user_decks = []
    if current_user:
        user = collection.find_one({'username': current_user}, {'decks': 1})
        for deck in user['decks']:
            deck['_id'] = str(deck['_id'])
            user_decks.append(deck)
        return make_response(jsonify(user_decks), 200)
    else:
        return make_response(jsonify({'msg': 'Invalid user'}), 404)
    
@app.route('/api/v1.0/users/deck/<deckId>', methods=['DELETE'])
@jwt_required()
def delete_deck_by_id(deckId):
    current_user_id = get_jwt_identity()

    if deckId:
        if current_user_id:
            user = collection.find_one({'username': current_user_id}, {'decks': 1})
            for deck in user['decks']:
                if deck['_id'] == ObjectId(deckId):
                    collection.update_one({'username': current_user_id}, {'$pull':{'decks':{'_id': ObjectId(deck['_id'])}}})
                    return make_response(jsonify({'msg':'deck successfully deleted'}), 200)
            return make_response(jsonify({'msg': 'invalid deck ID'}), 404)
        else:
            return make_response(jsonify({'msg': 'Invalid credentials'}), 401)
    
@app.route('/api/v1.0/users/deck/<deckId>', methods=['PUT'])
@jwt_required()
def edit_deck_by_id(deckId):
    current_user_id = get_jwt_identity()
    posted_data = request.get_json()

    if 'name' in posted_data or 'description' in posted_data or 'pokemon' in posted_data:
        if current_user_id:
            user_query = {'username': current_user_id, 'decks._id': ObjectId(deckId)}
            update_data = {'$set': {}}

            if 'name' in posted_data:
                update_data['$set']['decks.$.name'] = posted_data['name']

            if 'description' in posted_data:
                update_data['$set']['decks.$.description'] = posted_data['description']
            
            if 'pokemon' in posted_data:
                result = collection.find_one({'username': current_user_id, 'decks._id': ObjectId(deckId)}, {'decks.$': 1})
                if result:
                    deck = result['decks'][0]

                # Traverse the pokemon objects in the deck and ensure that the pokemon doesn't already exist
                for pokemon in deck['pokemon']:
                    if str(pokemon['_id']) == posted_data['pokemon']['_id']:
                        return make_response(jsonify({'msg': 'Pokemon already in deck!!'}))

                update_data['$push'] = {'decks.$.pokemon': posted_data['pokemon']}

            result = collection.update_one(user_query, update_data)

            if result.matched_count > 0:
                return make_response(jsonify({'msg': 'deck successfully updated'}), 200)
            else:
                return make_response(jsonify({'msg': 'Invalid deck ID'}), 404)
        else:
            return make_response(jsonify({'msg': 'Invalid credentials'}), 401)
    else:
        return make_response(jsonify({'msg': 'Missing fields'}), 400)
        
@app.route('/api/v1.0/user/deck/<deckId>/<pokemonId>', methods=['DELETE'])
@jwt_required()
def delete_pokemon_from_deck(deckId, pokemonId):
    current_user = get_jwt_identity()
    if current_user:
        user_query = collection.find_one({'username': current_user, 'decks._id': ObjectId(deckId)})
        if user_query:
            result = collection.update_one(
                {'username': current_user, 'decks._id': ObjectId(deckId)},
                {'$pull': {'decks.$.pokemon': {'_id': pokemonId}}})
            
            if result.modified_count > 0:
                return make_response(jsonify({'msg': 'pokemon successfully deleted'}), 200)
            else:
                return make_response(jsonify({'msg': 'The pokemon does not exist in this deck'}), 404)
        else:
            return make_response(jsonify({'msg': 'invalid deck ID'}), 404)
    else:
        return make_response(jsonify({'msg': 'Invalid user'}), 401)


        
@app.route('/api/v1.0/user/logout')
@jwt_required()
def log_user_out():
    current_user = get_jwt_identity()
    response = make_response(jsonify({'msg': 'user successfully logged out'}), 200)
    unset_jwt_cookies(response)
    return response

if __name__ == '__main__':
    app.run(debug=True)