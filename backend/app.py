from flask import Flask, request, jsonify
from transformers import pipeline
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
chatbot = pipeline("text-generation", model="gpt2")

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json['input']
    response = chatbot(user_input, max_length=100, do_sample=True, temperature=0.9)
    return jsonify({'response': response[0]['generated_text']})

if __name__ == '__main__':
    app.run(debug=True)
