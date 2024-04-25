import React, { useState, useEffect, useRef } from 'react';
import { AppBar, Container, Toolbar, Typography, TextField, MenuItem, Select, IconButton, InputAdornment, Button } from '@mui/material';
import styled from '@emotion/styled';
import { FormControl, FormGroup, FormControlLabel, Checkbox, RadioGroup, Radio } from '@mui/material';
import {
    loadCaptchaEnginge,
    LoadCanvasTemplate,
    LoadCanvasTemplateNoReload,
    validateCaptcha,
} 
from 'react-simple-captcha';
import ReactSwitch from 'react-switch';
import RefreshIcon from '@mui/icons-material/Refresh';
import WaveSurfer from 'wavesurfer.js';
// import Logo from './Logo.png';
const apiKey = '332c16d1a8db4a10b44047fd0888b485';

const languages = [
    { value: 'en-us', label: 'English' },
    { value: 'ar-eg', label: 'Arabic (Egypt)' },
    { value: 'ar-sa', label: 'Arabic (Saudi Arabia)' },
    { value: 'zh-cn', label: 'Chinese' },
    { value: 'nl-be', label: 'Dutch' },
    { value: 'en-ca', label: 'English (Canada)' },
    { value: 'fr-fr', label: 'French' },
    { value: 'de-de', label: 'German' },
    { value: 'el-gr', label: 'Greek' },
    { value: 'hi-in', label: 'Hindi' },
    { value: 'id-id', label: 'Indonesian' },
    { value: 'it-it', label: 'Italian' },
    { value: 'ja-jp', label: 'Japanese' },
    { value: 'ko-kr', label: 'Korean' },
    { value: 'pt-pt', label: 'Portuguese' },
    { value: 'ru-ru', label: 'Russian' },
    { value: 'es-es', label: 'Spanish ' },
    { value: 'sv-se', label: 'Swedish' }
];


const SelectContainer = styled('div')({
    '& .MuiOutlinedInput-root': {
        borderBottomRightRadius: '1rem',
        borderBottomLeftRadius: '1rem',
        borderTopRightRadius: '1rem',
        borderTopLeftRadius: '1rem',
        border: '2px solid rgba(0, 0, 0, 0.6)',
        boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.6)',
        '&:hover fieldset': {
            borderColor: 'rgba(0, 0, 0, 0.6)',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'rgba(0, 0, 0, 0.6)',
        },
        '&:hover': {
            boxShadow: 'none',
        },
    },
});

function App() {
    const [isHovered, setIsHovered] = useState(false);
    const [isHovered1, setIsHovered1] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);
    const [text, setText] = useState('');
    const [highlightIndex, setHighlightIndex] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState('en-us');
    const [filteredLanguages, setFilteredLanguages] = useState(languages);
    const maxChars = 1500;
    const [speech, setSpeech] = useState('');
    const newspeech = useRef();
    const [checked, setChecked] = useState(false);
    const [checked1, setChecked1] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isContainerOpen, setIsContainerOpen] = useState(false);
    const [speed, setSpeed] = React.useState('1');
    const [volume, setVolume] = React.useState('1');
    const [voiceQuality, setVoiceQuality] = React.useState('8khz_8bit_stereo');
    const [audioCreated, setAudioCreated] = useState(false);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const language = "en-US";
    const [audioFormat, setAudioFormat] = useState('mp3');
    const [isDropdownChanged, setIsDropdownChanged] = React.useState(false);
    const [isCaptchaCorrect, setIsCaptchaEntered] = React.useState(false);
    const waveformRef = useRef(null);
    const audioRef = useRef(null);
    const wavesurfer = useRef(null);
    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState('');
    const voicesByLanguage = {
        'en-us': [
            { name: 'Linda', gender: 'Female', available: 'Yes' },
            { name: 'Amy', gender: 'Female', available: 'No' },
            { name: 'Mary', gender: 'Female', available: 'No' },
            { name: 'John', gender: 'Male', available: 'No' },
            { name: 'Mike', gender: 'Male', available: 'No' }
        ],
        'ar-eg': [
            { name: 'Oda', gender: 'Female', available: 'Yes' },
        ],
        'ar-sa': [
            { name: 'Salim', gender: 'Male', available: 'Yes' },
        ],
        'zh-cn': [
            { name: 'Luli', gender: 'Female', available: 'Yes' },
            { name: 'Shu', gender: 'Female', available: 'No' },
            { name: 'Chow', gender: 'Female', available: 'No' },
            { name: 'Wang', gender: 'Male', available: 'No' },
        ],
        'nl-be': [
            { name: 'Daan', gender: 'Male', available: 'Yes' },
        ],
        'en-ca': [
            { name: 'Rose', gender: 'Female', available: 'Yes' },
            { name: 'Clara', gender: 'Female', available: 'No' },
            { name: 'Emma', gender: 'Female', available: 'No' },
            { name: 'Mason', gender: 'Male', available: 'No' },
        ],
        'fr-fr': [
            { name: 'Bette', gender: 'Female', available: 'Yes' },
            { name: 'Iva', gender: 'Female', available: 'No' },
            { name: 'Zola', gender: 'Female', available: 'No' },
            { name: 'Axel', gender: 'Male', available: 'No' },
        ],
        'de-de': [
            { name: 'Hanna', gender: 'Female', available: 'Yes' },
            { name: 'Lina', gender: 'Female', available: 'No' },
            { name: 'Jonas', gender: 'Female', available: 'No' },
        ],
        'el-gr': [
            { name: 'Neo', gender: 'Male', available: 'Yes' },
        ],
        'hi-in': [
            { name: 'Puja', gender: 'Female', available: 'Yes' },
            { name: 'Kabir', gender: 'Male', available: 'No' },
        ],
        'id-id': [
            { name: 'Intan', gender: 'Male', available: 'Yes' },
        ],
        'it-it': [
            { name: 'Bria', gender: 'Female', available: 'Yes' },
            { name: 'Mia', gender: 'Female', available: 'No' },
        ],
        'ja-jp': [
            { name: 'Hina', gender: 'Female', available: 'Yes' },
            { name: 'Airi', gender: 'Female', available: 'No' },
            { name: 'Fumi', gender: 'Female', available: 'No' },
            { name: 'Akira', gender: 'Male', available: 'No' },
        ],
        'ko-kr': [
            { name: 'Nari', gender: 'Female', available: 'Yes' },
        ],
        'pt-pt': [
            { name: 'Leonor', gender: 'Female', available: 'Yes' },
        ],
        'ru-ru': [
            { name: 'Olga', gender: 'Female', available: 'Yes' },
            { name: 'Marina', gender: 'Female', available: 'No' },
            { name: 'Peter', gender: 'Male', available: 'No' },
        ],
        'es-es': [
            { name: 'Camila', gender: 'Female', available: 'Yes' },
            { name: 'Sofia', gender: 'Female', available: 'No' },
            { name: 'Luna', gender: 'Female', available: 'No' },
            { name: 'Diego', gender: 'Male', available: 'No' },
        ],
        'sv-se': [
            { name: 'Molly', gender: 'Female', available: 'Yes' },
            { name: 'Hugo', gender: 'Male', available: 'No' },
        ],
    };

    const handleChange = (event) => {
        setText(event.target.value);
    };

    useEffect(() => {
        loadCaptchaEnginge(5, "rgb(18, 78, 102)", "white");
    }, []);

    useEffect(() => {
    }, [speech])

    useEffect(() => {
        setVoices(voicesByLanguage[language] || []);
        setSelectedVoice(voicesByLanguage[language]?.find(voice => voice.available)?.name || '');
    }, [language]);

    const handleChange1 = val => {
        setChecked(val);
    }

    const handleChange2 = (checked) => {
        if (checked || checked1) {
            setChecked1(checked);
        }
    };
    const handleLanguageChange = (event) => {
        setSelectedLanguage(event.target.value);
    };

    const handleVoiceSelection = (voiceName) => {
        setSelectedVoice(voiceName);
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('audio/')) {
            setSelectedFile(file);
            setChecked1(true);
            alert('Audio file uploaded successfully.');
        } else {
            event.target.value = null;
            alert('Please select a valid audio file.');
        }
    };

    const handleAudioPlay = () => {
        setIsAudioPlaying(true);
        wavesurfer.current.play();
        setHighlightIndex(0);
    };

    const handleAudioPause = () => {
        setIsAudioPlaying(false);
        wavesurfer.current.pause();
    };

    const playAudio = () => {
        if (speech) {
            audioRef.current.play();
        }
    };

    const handleMoreSettingToggle = () => {
        setIsContainerOpen(!isContainerOpen);
    };

    const handleSpeedChange = (event) => {
        const value = event.target.value;
        setSpeed(value);
        setIsDropdownChanged(true);
    };

    const handleVolumeChange = (event) => {
        const value = parseFloat(event.target.value);
        setVolume(value);
        setIsDropdownChanged(true);
    };

    const handleVoiceQualityChange = (event) => {
        const value = event.target.value;
        setVoiceQuality(value);
        setIsDropdownChanged(true);
    };

    const handleAudioFormatChange = (event) => {
        setAudioFormat(event.target.value);
        setIsDropdownChanged(true);
    };


    useEffect(() => {
        if (isDropdownChanged) {
            convertToSpeech(language);    
        }
    }, [audioFormat, speed, volume, voiceQuality, isDropdownChanged]);

    const convertToSpeech = (language) => {
        const enteredCaptcha = document.getElementById("captchaInput").value;
        if (enteredCaptcha.length === 5) {
            const isCaptchaCorrect = validateCaptcha(enteredCaptcha);
            setIsCaptchaEntered(isCaptchaCorrect);
            setAudioCreated(isCaptchaCorrect);
            
            if (isCaptchaCorrect) {
                const finalSelectedVoice = selectedVoice !== '' ? selectedVoice : voicesByLanguage[language]?.find(voice => voice.available === 'Yes')?.name || '';
                const audioSrc = `http://api.voicerss.org/?key=${apiKey}&hl=${language}&v=${finalSelectedVoice}&src=${text}&c=${audioFormat}&r=${speed}`;
                
                fetch(audioSrc)
                    .then(response => response.blob())
                    .then(audioBlob => {
                        const audioUrl = URL.createObjectURL(audioBlob);
                        const speechAudio = new Audio(audioUrl);
                        if (selectedFile) {
                            const combinedBlob = new Blob([selectedFile, audioBlob], { type: 'audio/mpeg' });
                            const combinedAudioUrl = URL.createObjectURL(combinedBlob);
                            setSpeech(combinedAudioUrl);
                            newspeech.current = combinedAudioUrl;                            
                            const backgroundMusic = new Audio('path_to_background_music.mp3');
                            backgroundMusic.loop = true;
                            backgroundMusic.volume = 0.2; 
                            backgroundMusic.addEventListener('canplaythrough', () => {
                                backgroundMusic.play();
                                setSpeech(audioUrl);
                                newspeech.current = audioUrl;
                            });
                            backgroundMusic.addEventListener('error', (error) => {
                                console.error('Error loading background music:', error);
                            });
                        } else {                            
                            setSpeech(audioUrl);
                            newspeech.current = audioUrl;
                        }
                    })
                    .catch(error => {
                        console.error('Error synthesizing speech:', error);
                    });
            } else {
                alert("Captcha is wrong!");
            }
        } else {
            alert("Please enter a 5-character captcha.");
        }
    };
    
    
    
    const clearTextWithAnimation = () => {
        const textLength = text.length;
        let newText = text;
        for (let i = 0; i < textLength; i++) {
            setTimeout(() => {
                newText = newText.slice(0, -1);
                setText(newText);
            }, 50 * i);
        }
    };

    const handleDownload = () => {
        fetch(speech)
            .then(response => response.blob())
            .then(blob => {
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = "audio.mp3";
                link.style.display = "none";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                alert("Audio has been downloaded");
            })
            .catch(error => console.error('Error:', error));
    };

    useEffect(() => {
        const handleTimeUpdate = () => {
            const currentTime = audioRef.current.currentTime;
            const duration = audioRef.current.duration;
            const wordCount = text.split(' ').length;
            const currentWordIndex = Math.floor((wordCount * currentTime) / duration);
            setHighlightIndex(currentWordIndex);
        };

        if (speech) {
            audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
        }

        return () => {
            if (speech) {
                audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
            }
        };
    }, [speech, text]);

    useEffect(() => {
        if (speech && waveformRef.current) {
            wavesurfer.current = WaveSurfer.create({
                container: waveformRef.current,
                barWidth: 3,
                barHeight: 2,
                cursorWidth: 2,
                height: 100,
                width:300,
                hideScrollbar: true,
                responsive: true,
                waveColor: 'white',
                progressColor: 'rgb(18, 78, 102)',
            });
            wavesurfer.current.load(speech);
            if (wavesurfer.current.backend) {
                wavesurfer.current.backend.setMediaElement(audioRef.current);
            }
            if (audioRef.current) {
                audioRef.current.addEventListener('play', handleAudioPlay);
                audioRef.current.addEventListener('pause', handleAudioPause);
            }
        }

        return () => {
            if (wavesurfer.current) {
                wavesurfer.current.destroy();
            }
            if (audioRef.current) {
                audioRef.current.removeEventListener('play', handleAudioPlay);
                audioRef.current.removeEventListener('pause', handleAudioPause);
            }
        };
    }, [speech]);


    return (
        <div style={{
            backgroundColor: 'white'
        }}>
            <AppBar position="static" sx={{ backgroundColor: 'white', height: '80px' }}>
                <Toolbar sx={{ color: 'white', backgroundColor: 'rgb(18, 78, 102)' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {/* <img src={Logo} alt="Logo" style={{ marginLeft: '-80px', width: '200px', height: '200px' }} /> */}
                        <Typography variant="h6" component="div" sx={{ marginLeft: '-70px', fontWeight: 'bold', fontSize: '25px' }}>
                            Text to Speech
                        </Typography>
                    </div>
                </Toolbar>
            </AppBar>
            <Container sx={{ display: 'flex', marginTop: '20px' }}>
                <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '20px' }}>
                    {audioCreated && (
                        <Container xs={12} style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            backgroundColor: '#f0f1f3',
                            border: '.0625rem solid rgba(0, 0, 0, .6)',
                            borderWidth: '2px',
                            borderRadius: '0.3rem',
                        }}>
                            <img style={{
                                width: '7.875rem',
                            }} src='https://ttsmaker.com/static/v3_theme_01_asset/img/ttsm_play_01_min.png' alt="play icon" />
                            <label style={{
                                marginTop: '.25rem',
                                fontSize: '2rem',
                                fontWeight: '600',
                                lineHeight: '1.2',
                                color: '#183153',
                            }}>
                                convert text to speech success! </label>

                            <div ref={waveformRef} style={{ marginTop: '20px' }}></div>

                            {speech && (
                                <audio
                                    controls
                                    autoPlay
                                    onPlay={handleAudioPlay}
                                    onPause={handleAudioPause}                                   
                                    src={speech}
                                    ref={audioRef}
                                    style={{ width: '100%', marginTop: '20px' }}></audio>
                            )}
                                <div style={{
                                    marginTop:'20px',
                                    marginBottom:'20px'
                                }}>
                                    {text.split(' ').map((word, index) => (
                                        <span
                                            key={index}
                                            style={{ backgroundColor: index === highlightIndex ? 'rgb(116, 141, 146)' : 'transparent' }}
                                        >
                                            {word}{' '}
                                        </span>
                                    ))}
                                </div>
                            <div style={{ display: "flex", marginBottom: "20px" }}>
                                <Button
                                    onClick={handleDownload}
                                    style={{
                                        backgroundColor: isHovered2 ? 'rgb(116, 141, 146)' : 'rgb(18, 78, 102)',
                                        padding: '0.75rem 1rem',
                                        fontSize: '13px',
                                        borderRadius: '0.3125rem',
                                        fontFamily: 'inherit',
                                        color: 'White',
                                        width: '300px',
                                        border: '1px solid black',
                                        borderRadius: '0.3rem',
                                        boxShadow: isHovered2 ? '0px 8px 8px rgba(0, 0, 0, 0.25)' : 'none',
                                    }}
                                    onMouseEnter={() => setIsHovered2(true)}
                                    onMouseLeave={() => setIsHovered2(false)}
                                >
                                    <i className="bi bi-cloud-download-fill p-2"
                                        style={{
                                            padding: '0.25rem !important',
                                            fontStyle: 'italic',
                                            fontSize: '.875rem',
                                            marginRight: '10px',
                                        }}></i> Download Voice File
                                </Button>
                            </div>
                        </Container>
                    )}
                    <div style={{
                        fontSize: '.875rem',
                        fontWeight: 'bold',
                        color: 'rgb(18, 78, 102)',
                        padding: '10px'
                    }}>
                        Maximum characters {maxChars} remaining {maxChars - text.length} available
                        {text && (
                            <button style={{
                                '--bs-text-opacity': 1,
                                color: 'rgb(18, 78, 102)',
                                backgroundColor: 'transparent',
                                border: 'transparent',
                            }} onClick={clearTextWithAnimation}>
                                <i className="bi bi-eraser mr-1"></i> Clear Text
                            </button>
                        )}
                    </div>

                    <TextField
                        placeholder="Enter your text here"
                        multiline
                        value={text}
                        onChange={handleChange}
                        inputProps={{
                            maxLength: 1500,
                            style: {
                                width: '700px',
                                height: '500px',
                                fontSize: '20px',                                
                            }
                        }}
                        InputLabelProps={{
                            shrink: true,
                            focused: false,
                            style: {
                                display: 'none'
                            }
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: 'white',
                                borderBottomRightRadius: '0.3125rem',
                                borderBottomLeftRadius: '0.3125rem',
                                padding: '1.5rem',
                                border: '2px solid rgba(0, 0, 0, 0.6)',
                                '&:hover fieldset': {
                                    borderColor: 'rgba(0, 0, 0, 0.6)',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'rgba(0, 0, 0, 0.6)',
                                },
                            },
                        }}                       
                    >                    
                </TextField>
                   
                </Container>
                <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '20px' }}>
                    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '20px' }}>
                        <div style={{
                            fontSize: '.875rem',
                            fontWeight: 'bold',
                            color: "rgb(18, 78, 102)",
                            padding: '10px'
                        }}>
                            Languages
                        </div>
                        <SelectContainer>
                            <Select
                                value={selectedLanguage}
                                className="custom-select"
                                style={{
                                    width: '380px',
                                    backgroundColor: 'white'
                                }}
                                onChange={handleLanguageChange}
                            >
                                {filteredLanguages.map((language) => (
                                    <MenuItem key={language.value} value={language.value}>{language.label}</MenuItem>
                                ))}
                            </Select>
                        </SelectContainer>
                    </Container>
                    <Container style={{
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        boxShadow: '15px 15px 10px rgba(0, 0, 0, 0.1)',
                        padding: '15px',
                        backgroundColor: '#fff',
                        marginTop: '20px'
                    }}>
                        <div style={{ marginTop: '20px' }}>
                            {voicesByLanguage[selectedLanguage]?.map((voice) => (
                                <div key={voice.name} style={{ marginBottom: '5px' }}>
                                    <input
                                        type="radio"
                                        id={voice.name}
                                        name="selectedVoice"
                                        value={voice.name}
                                        checked={selectedVoice === voice.name || (selectedVoice === '' && voice.available === 'Yes')}
                                        onChange={() => handleVoiceSelection(voice.name)}
                                        style={{ marginRight: '5px' }}
                                    />
                                    <label htmlFor={voice.name} style={{ marginRight: '10px' }}>{voice.name}</label>
                                    <span>({voice.gender})</span>
                                </div>
                            ))}
                        </div>
                    </Container>
                    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '20px' }}>
                        <div style={{
                            fontSize: '13px',
                            color: 'rgb(18, 78, 102)',
                            fontWeight: 'bold',
                            padding: '10px'
                        }}>
                            Input verification code (identify the numbers in the picture)
                        </div>
                        <TextField
                            id="captchaInput"
                            placeholder="Enter Captcha"
                            InputProps={{
                                style: { height: '60px', fontSize: '24px', borderColor: '#1e2022', backgroundColor: 'white' },
                                inputProps: { maxLength: 5 },
                                endAdornment: (
                                    <InputAdornment position="end" style={{ marginTop: "10px !important" }}>
                                        <LoadCanvasTemplateNoReload style={{ marginTop: "10px !important" }} />
                                        <IconButton onClick={() => loadCaptchaEnginge(5, "rgb(18, 78, 102)", "white")} size="large" style={{ marginTop: "10px !important" }}>
                                            <RefreshIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}                              
                        />
                    </Container>
                    <Container sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginTop: '20px' }}>
                        <div style={{ display: "flex" }}>
                            <Button
                                style={{
                                    whiteSpace: 'nowrap',
                                    backgroundColor: isHovered1 ? '#c3c6d1' : '#f0f1f3',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    position: 'relative',
                                    msFlex: '1 1 auto',
                                    flex: '1 1 auto',
                                    fontFamily: 'inherit',
                                    color: '#4b5157',
                                    border: '1px solid black',
                                    borderTopRightRadius: '0',
                                    borderBottomRightRadius: '0',
                                    boxShadow: isHovered1 ? '0px 8px 8px rgba(0, 0, 0, 0.25)' : 'none',
                                    height: '51px',
                                }}

                                onMouseEnter={() => setIsHovered1(true)}
                                onMouseLeave={() => setIsHovered1(false)}
                                onClick={handleMoreSettingToggle}
                            >
                                <i className="bi bi-sliders p-1" style={{
                                    padding: '0.25rem !important',
                                    fontStyle: 'italic',
                                    fontSize: '.875rem',
                                    marginRight: '10px',
                                }}></i> More Setting
                            </Button>
                            <Button
                                style={{
                                    backgroundColor: isHovered ? 'rgb(116, 141, 146)' : 'rgb(18, 78, 102)',
                                    padding: '0.75rem 1rem',
                                    fontSize: '13px',
                                    borderRadius: '0.3125rem',
                                    fontFamily: 'inherit',
                                    color: 'white',
                                    width: '300px',
                                    border: '1px solid black',
                                    borderTopLeftRadius: '0',
                                    borderBottomLeftRadius: '0',
                                    boxShadow: isHovered ? '0px 8px 8px rgba(0, 0, 0, 0.25)' : 'none',
                                }}
                                onClick={(e) => {
                                    convertToSpeech(selectedLanguage);
                                }}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                <i className="bi bi-play-circle-fill p-1"
                                    style={{
                                        padding: '0.25rem !important',
                                        fontStyle: 'italic',
                                        fontSize: '.875rem',
                                        marginRight: '10px',
                                    }}></i> Convert To Speech
                            </Button>

                        </div>
                        <div style={{ position: "absolute", marginTop: "50px" }}>
                            {isContainerOpen && (
                                <Container style={{
                                    marginLeft: '-23px',
                                    marginBottom: '20px',
                                    marginTop: "10px"
                                }}>
                                    <Container style={{
                                        width: '400px',
                                        padding: '.6125rem 1rem',
                                        backgroundColor: '#fff',
                                        border: '1px solid rgba(0, 0, 0, .6)',
                                        background: '#fbfbfb url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' height=\'48\' viewBox=\'0 0 84 48\'%3E%3Cpath d=\'M0 0h12v6H0V0zm28 8h12v6H28V8zm14-8h12v6H42V0zm14 0h12v6H56V0zm0 8h12v6H56V8zM42 8h12v6H42V8zm0 16h12v6H42v-6zm14-8h12v6H56v-6zm14 0h12v6H70v-6zm0-16h12v6H70V0zM28 32h12v6H28v-6zM14 16h12v6H14v-6zM0 24h12v6H0v-6zm0 8h12v6H0v-6zm14 0h12v6H14v-6zm14 8h12v6H28v-6zm-14 0h12v6H14v-6zm28 0h12v6H42v-6zm14-8h12v6H56v-6zm0-8h12v6H56v-6zm14 8h12v6H70v-6zm0 8h12v6H70v-6zM14 24h12v6H14v-6zm14-8h12v6H28v-6zM14 8h12v6H14V8zM0 8h12v6H0V8z\' fill=\'%23d0d0c4\' fill-opacity=\'0.15\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
                                    }}>
                                        <Typography variant="h4" style={{
                                            color: '#8c98a4',
                                            fontSize: 'calc(1.275rem + .3vw)',
                                            fontWeight: '600',
                                            lineHeight: '1.2',
                                        }}>More Setting</Typography>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            flexBasis: 'auto',
                                            flexDirection: 'row',
                                            flexGrow: 0,
                                            flexShrink: 1,
                                            flexWrap: 'wrap',
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <Typography variant="body1" style={{
                                                    marginBottom: '1rem !important',
                                                    fontSize: '.875rem',
                                                    color: '#1e2022',
                                                    fontWeight: 'bold',
                                                    margin: '1em 0 1em',
                                                    marginRight: '10px'
                                                }}>🎧 Try Listen Mode: saving character quota</Typography>
                                                <ReactSwitch
                                                    checked={checked}
                                                    onChange={handleChange1}
                                                />
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <Typography variant="body1" style={{
                                                    marginBottom: '1rem !important',
                                                    fontSize: '.875rem',
                                                    color: '#1e2022',
                                                    fontWeight: 'bold',
                                                    margin: '1em 0 1em',
                                                    marginRight: '10px'
                                                }}>🎹 Add Background Music</Typography>
                                                <ReactSwitch
                                                    checked={checked1}
                                                    onChange={handleChange2}
                                                />
                                            </div>
                                            <div>
                                                <Typography variant="body1">
                                                    <input
                                                        type="file"
                                                        id="userSelectUseBackgroundMusicModal_btn"
                                                        onChange={handleFileUpload}
                                                        style={{ display: 'none' }}
                                                    />
                                                    <label htmlFor="userSelectUseBackgroundMusicModal_btn" style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
                                                        BGM upload and management
                                                    </label>
                                                </Typography>
                                            </div>
                                        </div>
                                        <div style={{
                                            marginTop: '10px'
                                        }}>
                                            <Typography variant="body1" style={{
                                                marginBottom: '1rem !important',
                                                fontSize: '.875rem',
                                                color: '#1e2022',
                                                fontWeight: 'bold',
                                                margin: '1em 0 1em',
                                                marginRight: '10px'
                                            }}>🗂️ Audio Files Format</Typography>
                                            <div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                            </div>
                                            <RadioGroup
                                                value={audioFormat}
                                                onChange={handleAudioFormatChange}
                                                name="RadioUserSelectAudioFormat"
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    flexWrap: 'nowrap',
                                                }}>
                                                <FormControlLabel
                                                    value="mp3"
                                                    style={{
                                                        padding: '10px',
                                                        backgroundColor: '#fff',
                                                        border: '.0625rem solid rgba(0, 0, 0, .6)',
                                                        marginLeft: '5px',
                                                    }}
                                                    control={<Radio style={{
                                                        marginLeft: '-15px'
                                                    }} />}
                                                    label={
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                            <img src="https://ttsmaker.com/static/v3_theme_01_asset/img/mp3.svg" alt="" style={{ maxHeight: '32px' }} />
                                                            <div style={{ marginLeft: '5px' }}>MP3</div>
                                                        </div>
                                                    }
                                                />
                                                <FormControlLabel value="ogg" style={{
                                                    padding: '10px',
                                                    backgroundColor: '#fff',
                                                    border: '.0625rem solid rgba(0, 0, 0, .6)',
                                                }} control={<Radio style={{
                                                    marginLeft: '-15px'
                                                }} />} label={
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <img src="https://ttsmaker.com/static/v3_theme_01_asset/img/ogg.svg" alt="" style={{ maxHeight: '32px' }} />
                                                        <div style={{ marginLeft: '5px' }}>OGG</div>
                                                    </div>
                                                } />
                                                <FormControlLabel value="aac" style={{
                                                    padding: '10px',
                                                    backgroundColor: '#fff',
                                                    border: '.0625rem solid rgba(0, 0, 0, .6)',
                                                }} control={<Radio style={{
                                                    marginLeft: '-15px'
                                                }} />} label={
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <img src="https://ttsmaker.com/static/v3_theme_01_asset/img/aac.svg" alt="" style={{ maxHeight: '32px' }} />
                                                        <div style={{ marginLeft: '5px' }}>AAC</div>
                                                    </div>
                                                } />
                                            </RadioGroup>
                                        </div>
                                        <FormGroup>
                                            <FormControl>
                                                <Typography variant="body1" style={{
                                                    marginBottom: '1rem !important',
                                                    fontSize: '.875rem',
                                                    color: '#1e2022',
                                                    fontWeight: 'bold',
                                                    margin: '1em 0 1em',
                                                    marginRight: '10px'
                                                }}>🗣️ Voice Speed</Typography>
                                                <Select
                                                    labelId="userSelectTTSSettingSpeed-label"
                                                    id="userSelectTTSSettingSpeed"
                                                    value={speed}
                                                    onChange={handleSpeedChange}
                                                >
                                                    <MenuItem value="-10">⏪ 0.5x</MenuItem>
                                                    <MenuItem value="-9">⏪ 0.6x</MenuItem>
                                                    <MenuItem value="-8">⏪ 0.7x</MenuItem>
                                                    <MenuItem value="-7">⏪ 0.8x</MenuItem>
                                                    <MenuItem value="-6">⏪ 0.85x</MenuItem>
                                                    <MenuItem value="-5">⏪ 0.9x</MenuItem>
                                                    <MenuItem value="-4">⏪ 0.95x</MenuItem>
                                                    <MenuItem value="1">1.0x (Default)</MenuItem>
                                                    <MenuItem value="2">⏩ 1.05x</MenuItem>
                                                    <MenuItem value="3">⏩ 1.1x</MenuItem>
                                                    <MenuItem value="4">⏩ 1.15x</MenuItem>
                                                    <MenuItem value="5">⏩ 1.2x</MenuItem>
                                                    <MenuItem value="6">⏩ 1.25x</MenuItem>
                                                    <MenuItem value="7">⏩ 1.3x</MenuItem>
                                                    <MenuItem value="8">⏩ 1.4x</MenuItem>
                                                    <MenuItem value="9">⏩ 1.5x</MenuItem>
                                                    <MenuItem value="10">⏩ 2.0x</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </FormGroup>
                                    </Container>
                                </Container>
                            )}
                        </div>

                    </Container>
                </Container>
            </Container>

        </div >

    );
}

export default App;
