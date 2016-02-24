from flask import Flask, render_template, request, url_for, redirect
app = Flask(__name__)


@app.route('/',  methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
    	if request.form['email']!='adim':
    		return redirect(url_for('welcome'))
    return render_template('login.html')


@app.route('/register')
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




if __name__ == '__main__':
	app.run(host='127.0.0.1', port=8000, debug=True)