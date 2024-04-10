import React, { useState, useEffect, useRef } from 'react';
import { AppBar, Container, Toolbar, Typography, TextField, MenuItem, Select, IconButton, InputAdornment, Button } from '@mui/material';
import styled from '@emotion/styled';
import { FormControl, FormGroup, FormControlLabel, Checkbox, RadioGroup, Radio } from '@mui/material';
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from 'react-simple-captcha';
import ReactSwitch from 'react-switch';
import RefreshIcon from '@mui/icons-material/Refresh';

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
    const [text, setText] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('en-us');
    const [filteredLanguages, setFilteredLanguages] = useState(languages);
    const maxChars = 3000;
    const [speech, setSpeech] = useState('');
    const newspeech = useRef();
    const [checked, setChecked] = useState(false);
    const [checked1, setChecked1] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isContainerOpen, setIsContainerOpen] = useState(false);
    const [speed, setSpeed] = React.useState('1.0'); 
    const [volume, setVolume] = React.useState('1');
    const [voiceQuality, setVoiceQuality] = React.useState('0');
    const [pitch, setPitch] = React.useState('1');
    const [pauseTime, setPauseTime] = React.useState('0');

    const handleChange = (event) => {
        setText(event.target.value);
    };
   
    useEffect(() => {
        loadCaptchaEnginge(5,"blue","white");
    }, []);

    useEffect(()=>{
    },[speech])

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

    const convertToSpeech = (language) => {
        const audioSrc = `http://api.voicerss.org/?key=${apiKey}&hl=${language}&src=${text}&c=MP3&f=48khz_16bit_stereo&eq=2&r=${voiceQuality}&s=${speed}&v=${volume}&a=${pitch}&p=${pauseTime}`;
        console.log(audioSrc)
        setSpeech(audioSrc);
        newspeech.current = audioSrc;
       
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0]; 
        if (file && file.type.startsWith('audio/')) {
          setSelectedFile(file); 
          setChecked1(true);
          alert('Audio get uploaded');
        } else {
          event.target.value = null;        
          alert('Please select a valid audio file.');
        }
    };      

    const handleMoreSettingToggle = () => {
        setIsContainerOpen(!isContainerOpen);
    };

    const handleSpeedChange = (event) => {
        setSpeed(event.target.value);
    };

    const handleVolumeChange = (event) => {
        setVolume(event.target.value);
    };

    const handleVoiceQualityChange = (event) => {
        setVoiceQuality(event.target.value);
    };

    const handlePitchChange = (event) => {
        setPitch(event.target.value);
    };

    const handlePauseTimeChange = (event) => {
        setPauseTime(event.target.value);
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

    return (
        <div>
            <AppBar position="static" sx={{ backgroundColor: 'white' }}>
                <Toolbar sx={{ borderBottom: '1px solid lightgrey', color: 'black' }}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', textAlign: 'center', fontSize: '25px' }}>
                        Text to Speech
                    </Typography>
                </Toolbar>
            </AppBar>        
            <Container sx={{ display: 'flex', marginTop: '20px' }}>
                <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '20px' }}>
                    <Container item xs={12}>                    
                        {speech && (                           
                            <audio controls autoPlay src={speech} style={{ width: '100%', marginTop: '20px' }}></audio>
                        )}
                    </Container>

                    <div style={{
                        fontSize: '.875rem',
                        fontWeight: 'bold',
                        color: '#1e2022',
                        padding: '10px'
                    }}>
                        Maximum characters {maxChars} remaining {maxChars - text.length} available
                        {text && (
                            <button style={{
                                '--bs-text-opacity': 1,
                                color: '#8c98a4',
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
                            maxLength: 3000,
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
                    />
                </Container>
                <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '20px' }}>
                <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '20px' }}>
                    <div style={{
                        fontSize: '.875rem',
                        fontWeight: 'bold',
                        color: '#1e2022',
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
                            }}
                            onChange={handleLanguageChange}
                        >
                             {filteredLanguages.map((language) => (
                                <MenuItem key={language.value} value={language.value}>{language.label}</MenuItem>
                            ))}
                        </Select>
                    </SelectContainer>
                </Container>  
                <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '20px' }}>
                  <div style={{
                        fontSize: '13px',                       
                        color: '#1e2022',
                        padding: '10px'
                    }}>
                  Input verification code (identify the numbers in the picture)
                  </div>
                  <TextField
                    placeholder="Enter Captcha"
                    InputProps={{
                      style: { height: '60px', fontSize: '24px', borderColor: '#1e2022' },
                      endAdornment: (
                        <InputAdornment position="end">
                            <LoadCanvasTemplateNoReload />
                            <IconButton onClick={() => loadCaptchaEnginge(6)} size="large">
                                <RefreshIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                    }}
                  />
                </Container>
                <Container sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginTop: '20px' }}>
                <div>
                <Button
                  style={{ whiteSpace: 'nowrap', 
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
                  <i className="bi bi-sliders p-1"  style={{
                    padding: '0.25rem !important',
                    fontStyle: 'italic',
                    fontSize: '.875rem',
                    marginRight: '10px',
                  }}></i> More Setting
                </Button>
                {isContainerOpen && (
                    <Container style={{
                        marginLeft: '-23px',
                        marginBottom: '20px',
                    }}>
                    <Container  style={{
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
                            <RadioGroup defaultValue="mp3" name="RadioUserSelectAudioFormat" style={{
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
                                    marginLeft:'5px',                                 
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
                                }}control={<Radio style={{
                                    marginLeft: '-15px'
                                }} />} label={
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src="https://ttsmaker.com/static/v3_theme_01_asset/img/ogg.svg" alt="" style={{ maxHeight: '32px' }} />
                                    <div style={{ marginLeft: '5px' }}>OGG</div>
                                    </div>
                                }/>
                            <FormControlLabel value="aac"  style={{                                  
                                    padding: '10px',                            
                                    backgroundColor: '#fff',
                                    border: '.0625rem solid rgba(0, 0, 0, .6)',                                                      
                                }}control={<Radio style={{
                                    marginLeft: '-15px'
                                }} />} label={
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src="https://ttsmaker.com/static/v3_theme_01_asset/img/aac.svg" alt="" style={{ maxHeight: '32px' }} />
                                    <div style={{ marginLeft: '5px' }}>AAC</div>
                                    </div>
                                }/>
                            </RadioGroup>
                        </div>
                        <FormGroup>
                        <FormControl>
                            <Typography variant="body1"  style={{
                                marginBottom: '1rem !important',
                                fontSize: '.875rem',
                                color: '#1e2022',
                                fontWeight: 'bold',
                                margin: '1em 0 1em',
                                marginRight: '10px'
                            }}>🗃️ MP3 Audio Quality</Typography>
                              <Select
                                    labelId="userSelectTTSVoiceQuality-label"
                                    id="userSelectTTSVoiceQuality"
                                    value={voiceQuality}
                                    onChange={handleVoiceQualityChange}
                                >
                                    <MenuItem value="0">Standard Quality (small size, fast synthesis)</MenuItem>
                                    <MenuItem value="1">High Quality (large size, slow synthesis)</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <Typography variant="body1"  style={{
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
                                <MenuItem value="0.5">⏪ 0.5x</MenuItem>
                                <MenuItem value="0.6">⏪ 0.6x</MenuItem>
                                <MenuItem value="0.7">⏪ 0.7x</MenuItem>
                                <MenuItem value="0.8">⏪ 0.8x</MenuItem>
                                <MenuItem value="0.85">⏪ 0.85x</MenuItem>
                                <MenuItem value="0.9">⏪ 0.9x</MenuItem>
                                <MenuItem value="0.95">⏪ 0.95x</MenuItem>
                                <MenuItem value="1.0">1.0x (Default)</MenuItem>
                                <MenuItem value="1.05">⏩ 1.05x</MenuItem>
                                <MenuItem value="1.1">⏩ 1.1x</MenuItem>
                                <MenuItem value="1.15">⏩ 1.15x</MenuItem>
                                <MenuItem value="1.2">⏩ 1.2x</MenuItem>
                                <MenuItem value="1.25">⏩ 1.25x</MenuItem>
                                <MenuItem value="1.3">⏩ 1.3x</MenuItem>
                                <MenuItem value="1.4">⏩ 1.4x</MenuItem>
                                <MenuItem value="1.5">⏩ 1.5x</MenuItem>
                                <MenuItem value="2.0">⏩ 2.0x</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <Typography variant="body1"  style={{
                                marginBottom: '1rem !important',
                                fontSize: '.875rem',
                                color: '#1e2022',
                                fontWeight: 'bold',
                                margin: '1em 0 1em',
                                marginRight: '10px'
                            }}>📢 Voice Volume</Typography>
                           <Select
                                labelId="userSelectTTSSettingVolume-label"
                                id="userSelectTTSSettingVolume"
                                value={volume}
                                onChange={handleVolumeChange}
                            >
                                <MenuItem value="0.1">🔽 10%</MenuItem>
                                <MenuItem value="0.3">🔽 30%</MenuItem>
                                <MenuItem value="0.5">🔽 50%</MenuItem>
                                <MenuItem value="0.8">🔽 80%</MenuItem>
                                <MenuItem value="1">100% (Default)</MenuItem>
                                <MenuItem value="1.2">🔼 120%</MenuItem>
                                <MenuItem value="1.5">🔼 150%</MenuItem>
                                <MenuItem value="1.8">🔼 180%</MenuItem>
                                <MenuItem value="2.0">🔼 200%</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <Typography variant="body1"  style={{
                                marginBottom: '1rem !important',
                                fontSize: '.875rem',
                                color: '#1e2022',
                                fontWeight: 'bold',
                                margin: '1em 0 1em',
                                marginRight: '10px'
                            }}>🎚️ Pitch Adjustment (Can be used for voice changing effects)</Typography>
                                <Select
                                    labelId="userSelectTTSSettingPitch-label"
                                    id="userSelectTTSSettingPitch"
                                    value={pitch}
                                    onChange={handlePitchChange}
                                >
                                    <MenuItem value="2.0">🔼 Super High pitch (+100%)</MenuItem>
                                    <MenuItem value="1.5">🔼 High pitch (+50%)</MenuItem>
                                    <MenuItem value="1.25">🔼 Medium-high pitch (+25%)</MenuItem>
                                    <MenuItem value="1.1">🔼 Slightly high pitch (+10%)</MenuItem>
                                    <MenuItem value="1.05">🔼 Slightly high pitch (+5%)</MenuItem>
                                    <MenuItem value="1">Default (normal pitch)</MenuItem>
                                    <MenuItem value="0.95">🔽 Slightly low pitch (-5%)</MenuItem>
                                    <MenuItem value="0.9">🔽 Slightly low pitch (-10%)</MenuItem>
                                    <MenuItem value="0.75">🔽 Low pitch (-25%)</MenuItem>
                                    <MenuItem value="0.5">🔽 Super low pitch (-50%)</MenuItem>
                                </Select>
                        </FormControl>
                        <FormControl>
                            <Typography variant="body1"  style={{
                                marginBottom: '1rem !important',
                                fontSize: '.875rem',
                                color: '#1e2022',
                                fontWeight: 'bold',
                                margin: '1em 0 1em',
                                marginRight: '10px',                                
                            }}>🕒 Adjust the pause time of each paragraph (new line)</Typography>
                                <Select
                                    labelId="userSelectTTSParagraphPauseTime-label"
                                    id="userSelectTTSParagraphPauseTime"
                                    value={pauseTime}
                                    onChange={handlePauseTimeChange}
                                >
                                    <MenuItem value="-1">🕒 0ms (eliminate pauses)</MenuItem>
                                    <MenuItem value="50">🕒 50ms</MenuItem>
                                    <MenuItem value="100">🕒 100ms</MenuItem>
                                    <MenuItem value="200">🕒 200ms</MenuItem>
                                    <MenuItem value="0">Default (300ms)</MenuItem>
                                    <MenuItem value="600">🕒 600ms</MenuItem>
                                    <MenuItem value="800">🕒 800ms</MenuItem>
                                    <MenuItem value="1000">🕒 1000ms</MenuItem>
                                    <MenuItem value="1200">🕒 1200ms</MenuItem>
                                    <MenuItem value="1500">🕒 1500ms</MenuItem>
                                    <MenuItem value="1800">🕒 1800ms</MenuItem>
                                    <MenuItem value="2000">🕒 2000ms</MenuItem>
                                    <MenuItem value="2500">🕒 2500ms</MenuItem>
                                    <MenuItem value="3000">🕒 3000ms</MenuItem>
                                    <MenuItem value="4000">🕒 4000ms</MenuItem>
                                    <MenuItem value="5000">🕒 5000ms</MenuItem>
                                    <MenuItem value="6000">🕒 6000ms</MenuItem>
                                    <MenuItem value="8000">🕒 8000ms</MenuItem>
                                    <MenuItem value="10000">🕒 10000ms</MenuItem>
                                </Select>
                        </FormControl>
                        </FormGroup>
                    </Container>
                    </Container>
                )}
                </div>
                
                <Button
                  style={{  backgroundColor: isHovered ? '#fab005' : '#ffd43b',
                  padding: '0.75rem 1rem',
                  fontSize: '13px',
                  borderRadius: '0.3125rem',
                  fontFamily: 'inherit',
                  color: '#4b5157',
                  width: '300px',
                  border: '1px solid black',
                  borderTopLeftRadius: '0',
                  borderBottomLeftRadius: '0',
                  boxShadow: isHovered ? '0px 8px 8px rgba(0, 0, 0, 0.25)' : 'none',}}                 
                  onClick={(e)=>convertToSpeech(selectedLanguage)}
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
                </Container>
                </Container>                            
            </Container>
   
        </div>
        
    );
}

export default App;
