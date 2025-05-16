# backend/app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
from full_crawler import crawl_domain_with_subs

app = Flask(__name__)
CORS(app)  # يسمح بالاتصال من React

@app.route("/crawl", methods=["POST"])
def crawl():
    data = request.get_json()
    domain = data.get("domain")
    if not domain:
        return jsonify({"error": "No domain provided"}), 400

    print(f"🔍 Crawling: {domain}")
    links = crawl_domain_with_subs(domain)
    return jsonify({"pages": links})

if __name__ == "__main__":
    app.run(debug=True)
