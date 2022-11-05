
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';



export default function CharacterSelectAvatar(props) {
    const image = props.image || "images/flattruck.png";

    let Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
            background: `linear-gradient(145deg, rgba(32, 28, 44, 0.50), rgba(39, 33, 52, 0.50)), center / contain no-repeat url(${image})`,
    padding: theme.spacing(1),
    textAlign: 'center',
    height: "64px",
    width: "64px",
    borderRadius: "50%",
    color: theme.palette.text.secondary,
    boxShadow:
            "5px 5px 10px #1f1a2a, -5px -5px 10px #292438",
    "&:hover": {
    background: `linear-gradient(145deg, rgba(39, 33, 52, 0.50), rgba(32, 28, 44, 0.50)), center / contain no-repeat url(${image})`,
        },
    "&:active": {
        background: `center / contain no-repeat url(${image})`,
        boxShadow:
            "inset 5px 5px 10px #1f1a2a, inset -5px -5px 10px #292438",
    },
    }));

    if (props.selected) {
        Item = styled(Item)(({ theme }) => ({
            background: `center / contain no-repeat url(${image})`,
            boxShadow:
                "inset 5px 5px 10px #1f1a2a, inset -5px -5px 10px #292438",    
        }));
    }

    return (
        <Item />
    );
}