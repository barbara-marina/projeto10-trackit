import { Container, Data, Title, Text, Emphasis} from "./style";
import { BsFillCheckSquareFill }  from "react-icons/bs";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import axios from "axios";

export default function TodayHabit({todayHabit, setTodayHabits, setDone, todayHabits, done}) {
    const {data, setPercentage} = useContext(UserContext);


    function updateDatas() {
        const config = {headers: { Authorization: `Bearer ${data.token}`}};
        const URL_TODAY = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today';
        const request = axios.get(URL_TODAY, config);
        
        request.then(r => {setTodayHabits(r.data);
                           setDone(r.data.filter((e) => e.done===true && true));
                           setPercentage(Math.round((done.length*100)/todayHabits.length));
        });
        request.catch(e => console.log(e));
    }

    function checkHabit() {
        const config = {headers: { Authorization: `Bearer ${data.token}`}};
        let condition = "";

        (todayHabit.done) ? condition = "uncheck" : condition = "check";
        
        const URL_CHECK = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${todayHabit.id}/${condition}`;

        const request = axios.post(URL_CHECK, {}, config);
        request.then(() => updateDatas());
        request.catch(e => console.log(e));
    }

    return (
        <Container plus={true}>
            <Data>
                <Title>{todayHabit.name}</Title>
                <Text>Sequência atual: 
                    <Emphasis done={todayHabit.done}>{todayHabit.currentSequence} {todayHabit.currentSequence<2 ? "dia" : "dias"}</Emphasis>
                </Text> 
                <Text>Seu recorde: 
                    <Emphasis newRecord={ todayHabit.done && todayHabit.currentSequence===todayHabit.highestSequence}>{todayHabit.highestSequence} {todayHabit.highestSequence<2 ? "dia" : "dias"}</Emphasis>
                </Text> 
            </Data>
            <BsFillCheckSquareFill size={70} color={todayHabit.done ? '#8FC549' : '#EBEBEB'} onClick={checkHabit} />
        </Container>
    );
}