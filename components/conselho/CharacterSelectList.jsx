import { Box } from '@mui/system';
import Grid from '@mui/material/Unstable_Grid2';
import CharacterSelectAvatar from './CharacterSelectAvatar';

export default function CharacterSelectList(props) {
    const chars = props.chars;
    const selectedCharacter = props.selected;
    const setSelectedCharacter = props.setSelected;

    console.log("CharacterSelectList: " + selectedCharacter);

    let characterSelect = chars.map((char) => {
                                return <Grid xs={1} display="flex" justifyContent="center" alignItems="center" onClick={() => setSelectedCharacter(char)}>
                                    <CharacterSelectAvatar image={char.image} selected={char.name === selectedCharacter.name}/>
                                </Grid>;
                            });

    return (
        <Box>
            <Grid container className="gray" spacing={2} columns={4}>
                {characterSelect}
            </Grid>
        </Box>
    );
}