from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

# In a production environment, you would use a proper database
# For this example, we'll use a JSON file
ANNOUNCEMENTS_FILE = 'announcements.json'

def load_announcements():
    if os.path.exists(ANNOUNCEMENTS_FILE):
        with open(ANNOUNCEMENTS_FILE, 'r') as f:
            return json.load(f)
    return []

def save_announcements(announcements):
    with open(ANNOUNCEMENTS_FILE, 'w') as f:
        json.dump(announcements, f)

@app.route('/api/announcements', methods=['GET'])
def get_announcements():
    announcements = load_announcements()
    return jsonify(announcements)

@app.route('/api/announcements', methods=['POST'])
def create_announcement():
    data = request.json
    
    # Validate required fields
    required_fields = ['name', 'rarity']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400
    
    # Create new announcement
    announcement = {
        'name': data['name'],
        'rarity': data['rarity'],
        'description': data.get('description', ''),
        'timestamp': datetime.now().isoformat()
    }
    
    # Save to storage
    announcements = load_announcements()
    announcements.insert(0, announcement)  # Add to beginning of list
    save_announcements(announcements)
    
    return jsonify(announcement), 201

if __name__ == '__main__':
    app.run(debug=True) 