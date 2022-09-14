import {
    BrowserRouter as Router, Routes,
    Route,
} from "react-router-dom";
import QuestionTable from "./Questions/QuestionTable";
import {QuestionProvider} from "./Services/QuestionContext";
import './App.css'

function App() {
    return (
        <QuestionProvider>
            <Router>
                <Routes>
                    <Route path='/' element={<QuestionTable/>}/>
                </Routes>
            </Router>
        </QuestionProvider>
    )
        ;
}

export default App;
