from flask import Flask, request

app = Flask(__name__)

VERIFY_TOKEN = "my_custom_token"

@app.route("/webhook", methods=["GET"])
def verify_webhook():
    challenge = request.args.get("hub.challenge")
    token = request.args.get("hub.verify_token")

    if token == VERIFY_TOKEN:
        return challenge
    return "Verification failed", 403

@app.route("/webhook", methods=["POST"])
def receive_message():
    data = request.get_json()
    print("Primljena poruka:", data)
    return "OK", 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)
