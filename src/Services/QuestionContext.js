import {createContext, useState, useEffect} from "react";
import BaseUrl from "./BaseUrl";

const QuestionContext = createContext();

export const QuestionProvider = ({children}) => {
    const [questions, setQuestions] = useState([]);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const getQuestions = async (page, pageSize, searchValue) => {
        const response = await BaseUrl.get(`/questions?_page=${page}&_limit=${pageSize}&question_like=${searchValue}`);
        const totalCount = response.headers['x-total-count']
        setQuestions(response.data);
        setTotal(totalCount)
        setIsLoading(false);
    };

    const addQuestion = async (body) => {
        const response = await BaseUrl.post(`/questions`, {id: parseInt(total) + 1, active: true, ...body});
        setQuestions([...questions, response.data]);
        const totalCount = total + 1
        setTotal(totalCount)
        return response;
    };

    const deleteQuestion = async (id) => {
        const response = await BaseUrl.delete(`/questions/${id}`);
        setQuestions(questions.filter((question) => question.id !== id));
        const totalCount = total - 1
        setTotal(totalCount)
        return response;
    };

    const deactivateQuestion = async (id, body) => {
        body.active = false
        const response = await BaseUrl.put(`/questions/${id}`, body);
        questions.find(question => question.id === id).active = false
        setQuestions(questions)
        return response;
    };

    return (
        <QuestionContext.Provider
            value={{
                questions,
                isLoading,
                getQuestions,
                total,
                addQuestion,
                deleteQuestion,
                deactivateQuestion
            }}
        >
            {children}
        </QuestionContext.Provider>
    );
};

export default QuestionContext;
