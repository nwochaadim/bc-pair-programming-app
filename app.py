from flask import Flask, render_template, request, url_for, redirect, make_response
from firebase import firebase

app = Flask(__name__)



@app.route('/',  methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
    	if request.form['email']!='adim':
    		return redirect(url_for('welcome'))
    return render_template('login.html')

@app.route('/user/<id>')
def get_user(id):
    response = make_response(redirect('/welcome'))
    response.set_cookie('user', id, max_age=30*24*60*60)
    return response

@app.route('/register', methods=['GET', 'POST'])
def register():
    return render_template('register.html')

@app.route('/welcome')
def welcome():
    return render_template('main-page.html')

@app.route('/main')
def main():
    return render_template('app-view.html')


@app.route('/head')
def head():
    return render_template('header.html')


@app.route('/side')
def side():
    return render_template('sidebar.html')

@app.route('/content')
def content():
    return render_template('main-content.html')

@app.route('/collabview')
def collab():
    return render_template('collab-view.html')




if __name__ == '__main__':
	app.run(host='0.0.0.0', port=8000, debug=True)