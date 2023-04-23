import dayjs from "dayjs";
import styled from "styled-components";


export default function OperationCard({ amount, description, type, date }) {
    const day = dayjs(date).format("DD/MM");
    console.log(day);
    return (
        <ListItemContainer>
            <div>
                <span>{day}</span>
                <strong>{description}</strong>
            </div>
            <Value color={type}>{amount}</Value>
        </ListItemContainer>
    );
};

const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "entrada" ? "green" : "red")};
`;
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`;