import { Paper, Stack, Avatar, Grid } from "@mui/material";


export default function CharacterSelectPage(props) {
    const character = props.character;        
    const spec1 = props.spec1 || {
        name: "",
        effect: "",
    };
    const spec2 = props.spec2 || {
        name: "",
        effect: "",
    };
    const mission = props.mission || {
        name: "",
        description: "",
    }
    const seal = props.seal || {
        name: "",
        description: "",
    }

    return (
        <Paper sx={{ p: 2, margin: 'auto', maxWidth: 500, flexGrow: 1 }}>
            <Stack spacing={2}>
                <Stack direction="row" spacing={10} alignItems="center">
                    <Avatar alt={character.name} src={character.image} sx={{ width: 78, height: 78 }} />
                    <h1>{character.name}</h1>
                </Stack>
                <p>{character.description}</p>

                <Grid container spacing={2} columns={3}>
                    <Grid item xs={1}>
                        <h2 style={{color: "#000"}}>{character.strength}</h2>
                        <p>STR</p>
                    </Grid>
                    <Grid item xs={1}>
                        <h2 style={{color: "#000"}}>{character.willpower}</h2>
                        <p>WIL</p>
                    </Grid>
                    <Grid item xs={1}>
                        <h2 style={{color: "#000"}}>{character.agility}</h2>
                        <p>AGI</p>
                    </Grid>
                    <Grid item xs={1}>
                        <h2 style={{color: "#000"}}>{character.perception}</h2>
                        <p>PER</p>
                    </Grid>
                    <Grid item xs={1}>
                        <h2 style={{color: "#000"}}>{character.endurance}</h2>
                        <p>END</p>
                    </Grid>
                    <Grid item xs={1}>
                        <h2 style={{color: "#000"}}>{character.discipline}</h2>
                        <p>DIS</p>
                    </Grid>
                    <Grid item xs={3}>
                        <p>
                            <b>{character.get_melee_attack_style()[0]}</b> {character.get_melee_attack_style()[1]}
                        </p>
                        <p>
                            <b>{character.get_ranged_attack_style()[0]}</b> {character.get_ranged_attack_style()[1]}
                        </p>
                    </Grid>
                    <Grid item xs={1}>
                        <h2 style={{color: "#000"}}>{character.health()}</h2>
                        <p>HP</p>
                    </Grid>
                    <Grid item xs={1}>
                        <h2 style={{color: "#000"}}>{character.aura()}</h2>
                        <p>AURA</p>
                    </Grid>
                    <Grid item xs={1}>
                        <h2 style={{color: "#000"}}>{character.capacity()}</h2>
                        <p>CAP</p>
                    </Grid>
                </Grid>

                <h3 style={{color: "#000"}}>Side Mission</h3>
                <p>{mission.name}</p>
                <p>{mission.description}</p>

                <h3 style={{color: "#000"}}>Abilities</h3>
                <p>{character.ability1}</p>
                <p>{character.ability2}</p>
                <p>{character.ability3}</p>


                <h3 style={{color: "#000"}}>Specializations</h3>
                <p>{spec1.name}</p>
                <p>{spec1.effect}</p>
                <p>{spec2.name}</p>
                <p>{spec2.effect}</p>

                <h3 style={{color: "#000"}}>Seal</h3>
                <p>{seal.name}</p>
                <p>{seal.description}</p>

            </Stack>
        </Paper>
    );
}