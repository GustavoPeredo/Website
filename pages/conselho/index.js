import Grid from '@mui/material/Unstable_Grid2';
import { Box, Stack } from '@mui/system';
import { Avatar, Button, Paper, ListItemButton, List } from '@mui/material';
import characters from './characters.json';
import specializations from './specializations.json';
import missions from './missions.json';
import items from './items.json';
import seals from './seals.json';
import React, { useState, useEffect } from 'react';
import CharacterSelectPage from '../../components/conselho/CharacterSelectPage';
import CharacterSelectList from '../../components/conselho/CharacterSelectList';

export default function Page(props) {
    const [page, setPage] = useState(0);
    
    const [damageTaken, setDamageTaken] = useState(0);
    const [bulletsUsed, setBulletsUsed] = useState(0);

    let Character = class {
        constructor(char) {
            this.name = char.name;
            this.description = char.description;
            this.image = char.image;
            this.ability1 = char.ability1;
            this.ability2 = char.ability2;
            this.ability3 = char.ability3;
            this.strength = char.strength;
            this.willpower = char.willpower;
            this.agility = char.agility;
            this.perception = char.perception;
            this.endurance = char.endurance;
            this.discipline = char.discipline;
        }
        health() {
            if (this.aura() > 0) {
                return this.endurance + 1;
            } else {
                return this.endurance + 1 + this.perception - damageTaken;
            }
        }
        aura() {
            return this.perception + 10 - damageTaken;
        }

        capacity() {
            return this.discipline + 1 - bulletsUsed;
        }

        heal(number) {
            setDamageTaken(damageTaken - number);
            if (damageTaken < 0) {
                setDamageTaken(0);
            }
        }

        get_melee_attack_style() {
            var options = ["Aggressive", "Precise", "Elegant"];
            var values = [
                this.strength + this.endurance,
                this.strength + this.agility,
                this.strength + this.discipline
            ];
            var highest = Math.max(...values);
            var index = values.indexOf(highest);
            return [options[index], highest];
        }

        get_ranged_attack_style() {
            var options = ["Heavy", "Energy", "Accurate"];
            var values = [
                this.agility + this.endurance,
                this.agility + this.willpower,
                this.agility + this.discipline
            ];
            var highest = Math.max(...values);
            var index = values.indexOf(highest);
            return [options[index], highest];
        }
    }

    let chars = characters.map((char) => {
        return new Character(char);
    });

    const [selectedCharacter, setSelectedCharacter] = React.useState(chars[0]);
    const [selectedSpecialization, setSelectedSpecialization] = React.useState(null);
    const [selectedSpecialization2, setSelectedSpecialization2] = React.useState(null);

    const genSpecialization = (specs, set, selected) => {
        return specs.map(
        (spec) => {
            return <ListItemButton
                selected={selected === spec}
                onClick={(event) => set(spec)}
            >
                <Stack>
            <h1>{spec.name}</h1>
            <p>{spec.effect}</p>

                </Stack>
        </ListItemButton>}
        );
    }

    let specializationsForCharacters = genSpecialization(specializations, setSelectedSpecialization, selectedSpecialization);
    let specializationsForCharacters2 = genSpecialization(specializations, setSelectedSpecialization2, selectedSpecialization2);

    const [selectedMission, setSelectedMission] = React.useState(null);

    // Get random mission
    const [chosenMissions, setChosenMissions] = useState([
        missions[Math.floor(Math.random() * missions.length)],
        missions[Math.floor(Math.random() * missions.length)],
        missions[Math.floor(Math.random() * missions.length)]
    ]);

    // Get three random missions
    let missionsForCharacters = chosenMissions.map(
        (mission) => {
            return <ListItemButton
                selected={selectedMission === mission}
                onClick={(event) => setSelectedMission(mission)}
            >
                <Stack>
            <h1>{mission.name}</h1>
            <p>{mission.description}</p>
            </Stack>
        </ListItemButton>}
    );

    const [selectedSeal, setSelectedSeal] = React.useState(null);

    const [money, setMoney] = React.useState(150);
    const [potion, setPotion] = React.useState(0);
    const [dust, setDust] = React.useState(0);
    const [sword, setSword] = React.useState(0);
    const [shield, setShield] = React.useState(0);
    const [amulet, setAmulet] = React.useState(0);

    // Create function that runs when money is changed
    useEffect(() => {
        // Update selected charactes strength depending on sword
        selectedCharacter.strength = selectedCharacter.strength + sword;
        // Update selected charactes endurance depending on shield
        selectedCharacter.endurance = selectedCharacter.endurance + shield;
        // Update selected charactes perception depending on amulet
        selectedCharacter.perception = selectedCharacter.endurance + amulet;
        selectedCharacter.discipline = selectedCharacter.discipline + amulet;
    }, [money]);

    return (
        <Box sx={{ flexGrow: 1, background: "#241f31"}}>
            <Grid container columns={2} spacing={2}>
                <Grid xs>
                    {page === 0 && 
                        <CharacterSelectList chars={chars} selected={selectedCharacter} setSelected={setSelectedCharacter} />
                    }
                    {page === 1 &&
                        <Stack direction={"row"} sx={{ height: "90%", background: "#241f31", color: "#fff" }}>
                            {missionsForCharacters}
                        </Stack>
                    }
                    {page === 2 &&
                        <Stack spacing={2} direction="row" sx={{ background: "#241f31", color: "#fff", maxHeight: "512px", overflow: "scroll"}}>
                            <List alignItems="flex-start">
                                {specializationsForCharacters}
                            </List>
                            <List alignItems="flex-start">
                                {specializationsForCharacters2}
                            </List>
                        </Stack>       
                    }
                    {page === 3 &&
                        <List sx={{ maxHeight: "512px", overflow: "scroll", background: "#241f31", color: "#fff" }}>
                            {seals.map(
                                (seal) => {
                                    return <ListItemButton
                                        selected={selectedSeal === seal}
                                        onClick={(event) => setSelectedSeal(seal)}
                                    >
                                        <Stack>
                                    <h1>{seal.name}</h1>
                                    <p>{seal.description}</p>
                                    </Stack>
                                </ListItemButton>}
                            )}
                        </List>
                    }
                    {page === 4 &&
                        <Stack sx={{ background: "#241f31", color: "#fff", maxHeight: "512px", overflow: "scroll"}}>
                            <List alignItems="flex-start">
                                {items.map(
                                    (item) => {
                                        return <ListItemButton
                                            onClick={(event) => {
                                                if (item.price <= money) {
                                                    if (item.name === "Potion") {
                                                        setPotion(potion + 1);
                                                    } else if (item.name === "Dust") {
                                                        setDust(dust + 1);
                                                    } else if (item.name === "Sword") {
                                                        setSword(sword + 1);
                                                    } else if (item.name === "Shield") {
                                                        setShield(shield + 1);
                                                    } else if (item.name === "Amulet") {
                                                        setAmulet(amulet + 1);
                                                    }
                                                    setMoney(money - item.price);
                                                }
                                            }}
                                        >
                                            <Stack>
                                        <h1>{item.name}</h1>
                                        <p>{item.description}</p>
                                        <p>Cost: {item.price}</p>
                                        </Stack>
                                    </ListItemButton>}
                                )}
                            </List>
                            <p>Money: {money}</p>
                            {/* Have a button that refunds all items */}
                            <Button onClick={() => {
                                setMoney(money + potion * 30 + dust * 15 + sword * 100 + shield * 100 + amulet * 150);
                                setPotion(0);
                                setDust(0);
                                setSword(0);
                                setShield(0);
                                setAmulet(0);
                            }}>Refund All Items</Button>
                        </Stack>
                    }
                    {page === 5 &&
                        <Stack sx={{ background: "#241f31", color: "#fff", maxHeight: "512px", overflow: "scroll"}}>
                            <p>Potion: {potion}</p>
                            <p>Dust: {dust}</p>
                            <Button onClick={() => {
                                if (potion > 0) {
                                    setPotion(potion - 1);
                                }
                            }
                            }>Use Potion</Button>
                            <Button onClick={() => {
                                if (dust > 0) {
                                    selectedCharacter.health = selectedCharacter.health + 5;
                                    setDust(dust - 1);
                                }
                            }
                            }>Use Dust</Button>
                            <Button onClick={() => {
                                selectedCharacter.damageTaken = selectedCharacter.damageTaken + 1;
                            }
                            }>Take Damage</Button>
                            <Button onClick={() => {
                                selectedCharacter.heal(1);
                            }
                            }>Heal</Button>
                            <Button onClick={() => {
                                setBulletsUsed(bulletsUsed + 1);
                            }}>Use Bullet</Button>
                            <Button onClick={() => {
                                setBulletsUsed(bulletsUsed - 1);
                            }}>Recharge</Button>
                        </Stack>

                    }
                    {page > 0 &&
                        <Button sx={{ float: "left" }} variant="contained" onClick={() => setPage(page - 1)}>Back</Button>
                    }
                    {page < 5 &&
                        <Button sx={{ float: "right" }} variant="contained" onClick={() => setPage(page + 1)}>Next</Button>
                    }
                </Grid>
                <Grid xs>
                    <Box>
                        <CharacterSelectPage character={selectedCharacter} 
                            spec1={selectedSpecialization}
                            spec2={selectedSpecialization2}
                            mission={selectedMission}
                            seal={selectedSeal}
                            item={{potion: potion, dust: dust, sword: sword, shield: shield, amulet: amulet}}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
