import './App.css';
import {useState} from "react";


function Header(props) { //컴포넌트 이름은 대문자로 시작해야 된다.
    return <header>
        <h1><a href="/" onClick={(e) => {
            e.preventDefault()
            props.onChangeMode()
        }}>{props.title}</a></h1>
    </header>
}

function Quiz(props) {
    return <div>
        <h1><a href={'/quiz'}>Home</a></h1>
    </div>
}


function List(props) {
    const lis = [];
    for (let i = 0; i < props.quizzes.length; i++) {
        let quiz = props.quizzes[i];
        lis.push(<li key={quiz.id}>
            <a id={quiz.id} href={'/quiz/' + quiz.id} hint={quiz.hint} onClick={(e) => {
                e.preventDefault();
                props.onChangeMode(Number(e.target.id));
            }}>{quiz.title}</a>
        </li>);
    }
    return <nav>
        <ol>
            {lis}
        </ol>
    </nav>
}

function Article(props) {
    return <article>
        <h2>{props.title}</h2>
        {props.hint}
        {/*<button onClick={alert(props.answer)}>정답확인</button>*/}
    </article>
}

function Create(props) {
    return <article>
        <h2>Create</h2>
        <form onSubmit={e => {
            e.preventDefault();
            const title = e.target.title.value;
            const hint = e.target.hint.value;
            props.onCreate(title, hint);
        }}>
            <p><input type="text" name="title" placeholder="문제"/></p>
            <p><textarea name="hint" placeholder="힌트"/></p>
            <p><input type="submit" value="Create"/></p>
        </form>
    </article>
}

function Update(props) {
    return <article>
        <h2>Update</h2>
        <form onSubmit={e => {
            e.preventDefault();
            const title = e.target.title.value;
            const hint = e.target.hint.value;
            props.onUpdate(title, hint);
        }}>
            <p><input type="text" name="title" value={props.title}/></p>
            <p><textarea name="hint" placeholder="힌트"/></p>
            <p><input type="submit" value="Update"/></p>
        </form>
    </article>
}

function App() {

    const [mode, setMode] = useState('WELCOME');
    const [id, setId] = useState(null);
    const [nextId, setNextId] = useState(4);
    const [quizzes, setQuizzes] = useState([
        {id: 1, title: '침대에서 제일 야한것은?', hint: '아침에 일어나면?', answer: '이불', description: '일어나면 이불 개야하니까'},
        {id: 2, title: '이탈리아의 날씨는?', hint: '그 나라 음식들만 봐도..', answer: '스파게티', description: '습하겠지? 습하겟티? 스파게티??'},
        {id: 3, title: '푸가 넘어지면?', hint: '어이쿵', answer: '쿵푸', description: '푸가 넘어지면 쿵! 쿵푸'}
    ]);
    let content = null;
    let contextControl = null;
    if (mode === 'WELCOME') {
        content = <Article title={"WELCOME"} hint={"어서와"}></Article>
    } else if (mode === 'READ') {
        let title, hint, answer = null;
        for (let i = 0; i < quizzes.length; i++) {
            if (quizzes[i].id === id) {
                title = quizzes[i].title;
                hint = quizzes[i].hint;
                answer = quizzes[i].answer;
                break;
            }
        }
        content = <Article title={title} hint={hint} answer={answer}></Article>
        contextControl = <li><a href={"/update/" + id} onClick={e => {
            e.preventDefault();
            setMode('UPDATE');
        }}>Update</a></li>
    } else if (mode === 'CREATE') {
        content = <Create onCreate={(_title, _hint) => {
            const newQuiz = {id: nextId, title: _title, hint: _hint}
            const newQuizzes = [...quizzes]
            newQuizzes.push(newQuiz);
            setQuizzes(newQuizzes);
            setMode('READ');
            setId(nextId);
            setNextId(nextId + 1);
        }}/>
    } else if (mode === 'UPDATE') {
        let title, hint, answer = null;
        for (let i = 0; i < quizzes.length; i++) {
            if (quizzes[i].id === id) {
                title = quizzes[i].title;
                hint = quizzes[i].hint;
                break;
            }
        }

        <Update title={title} hint={hint} onUpdate={(title, hint)=> {

        }}/>
    }


    return (
        <div>
            <Header title={'HAHAHA'} onChangeMode={() => {
                setMode('WELCOME')
            }}></Header>

            <List quizzes={quizzes} onChangeMode={(_id) => {
                setMode('READ')
                setId(_id)
            }}></List>
            {content}
            <li><a href="/create" onClick={(e) => {
                e.preventDefault()
                setMode('CREATE')
            }}>CREATE</a></li>
            {contextControl}
        </div>
    );
}

export default App;
