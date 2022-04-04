import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import Header from "../Header/index";
import Footer from "../Footer/index";
import TodayHabit from "../TodayHabit/index";
import { Container, Title, Subtitle } from "./style";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import axios from "axios";

export default function TodayPage() {
    const {data, percentage, setPercentage, todayHabits,
        setTodayHabits, done, setDone} = useContext(UserContext);
    const navigate = useNavigate();
    dayjs.locale('pt-br');

    useEffect(() => !data.token && navigate("/"), [data.token, navigate]);

    useEffect(() => {
        const URL_TODAY_LIST = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today';
        const config = {headers: { Authorization: `Bearer ${data.token}`}};
        const request = axios.get(URL_TODAY_LIST, config);
        
        request.then(r => {setTodayHabits(r.data);
                           setDone(r.data.filter((e) => e.done));
                           setPercentage(Math.round((done.length*100)/todayHabits.length));
        });
        request.catch(e => console.log("e: ", e));
    }, [data.token, done.length, todayHabits.length, setPercentage, setDone, setTodayHabits]);

    return (
        <>
        <Header/>
        <Container>
                <Title>
                    {`${(dayjs().format('dddd'))[0].toUpperCase()}${(dayjs().format('dddd, DD/MM')).slice(1)}`}
                </Title>
                <Subtitle done={(percentage>0 || percentage<=100)}>
                    {(percentage>0 || percentage<=100) ? `${percentage}% dos hábitos concluídos` 
                    : 'Nenhum hábito concluído ainda'}
                </Subtitle>

                {todayHabits.map((todayHabit, i) => <TodayHabit key={i} todayHabit={todayHabit}/>)}
                
                
            </Container>
        <Footer/>
        </>
    );
}