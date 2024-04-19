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
import Waveform from "./Waveform";
import { AudioVisualizer } from 'react-audio-visualize';
import WaveSurfer from 'wavesurfer.js';
const apiKey = '332c16d1a8db4a10b44047fd0888b485';
// import Regions from 'wavesurfer.js/dist/plugins/regions.esm.js' 

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
    const audioContext = new AudioContext();
    const [isDropdownChanged, setIsDropdownChanged] = React.useState(false);
    const [isCaptchaCorrect, setIsCaptchaEntered] = React.useState(false);
    const [blob, setBlob] = useState();
    const visualizerRef = useRef(null)
    const [audioUrl, setAudioUrl] = useState(null);

    const handleChange = (event) => {
        setText(event.target.value);
    };
   
    useEffect(() => {
        loadCaptchaEnginge(5,"rgb(18, 78, 102)","white");     
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

    const handleAudioPlay = () => {
        setIsAudioPlaying(true);
    };
    
    const handleAudioPause = () => {
        setIsAudioPlaying(false);
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
        const audioSrc = convertToSpeech(language);
        // playAudioWithVolume(audioSrc, volume);       
    }
    }, [audioFormat, speed, volume, voiceQuality, isDropdownChanged]);

    const convertToSpeech = (language) => {
        console.log("fsdfsdsdfsf")
        const enteredCaptcha = document.getElementById("captchaInput").value;
        console.log("fsdfsdf")
        if (enteredCaptcha.length === 5) {
            const isCaptchaCorrect = validateCaptcha(enteredCaptcha);
            setIsCaptchaEntered(isCaptchaCorrect);
            setAudioCreated(isCaptchaCorrect);  
            const audioSrc = `http://api.voicerss.org/?key=${apiKey}&hl=${language}&src=${text}&c=${audioFormat}&r=${speed}&f=${voiceQuality}`;
            console.log(audioSrc)
            setSpeech(audioSrc);
            fetch(`https://api.voicerss.org/?key=YOUR_API_KEY&hl=en-us&src=${encodeURIComponent(text)}`)
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);

        // Generate voice waves
        generateVoiceWaves(url);
      })
      .catch(error => console.error('Error:', error));
          
            newspeech.current = audioSrc;
            if (!isCaptchaCorrect) {
                alert("Captcha is wrong!");
            } 
            return audioSrc;            
        }else {        
            alert("Please enter a 5-character captcha.");
        }            
    };
    
    const generateVoiceWaves = (audioUrl) => {
        // Use a library like WaveSurfer.js to generate voice waves
        const wavesurfer = WaveSurfer.create({
          container: '#waveform',
          waveColor: 'violet',
          progressColor: 'purple',
          url: {audioUrl},
        });
        
        wavesurfer.load(audioUrl);
      };
    // const playAudioWithVolume = (audioSrc, volume) => {
    //     console.log(volume)
    //     const audio = new Audio(audioSrc);
    //     console.log(audio)
    //     const source = audioContext.createMediaElementSource(audio);
    //     const gainNode = audioContext.createGain();
    //     console.log(gainNode)
    //     gainNode.gain.value = volume;
    
    //     source.connect(gainNode);
    //     gainNode.connect(audioContext.destination);
    //     audio.play();
    // };
    

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
        <div style={{
            background: 'linear-gradient(90deg, rgba(18, 78, 102, 1) 0%, rgba(116, 141, 146, 1) 35%, rgba(211, 217, 212, 1) 100%)',height:"100vh"
        }}>
            <AppBar position="static" sx={{ backgroundColor: 'white' }}>
            <Toolbar sx={{ color: 'white', background: 'linear-gradient(90deg, rgba(18, 78, 102, 1) 0%, rgba(116, 141, 146, 1) 35%, rgba(211, 217, 212, 1) 100%)' }}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', textAlign: 'center', fontSize: '25px' }}>
                        Text to Speech
                    </Typography>
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
                        {/* <div id="waveform"></div> */}
                        {speech && (
                            <audio 
                            controls 
                            autoPlay 
                            onPlay={handleAudioPlay}  
                            onPause={handleAudioPause} 
                            src={speech} 
                            style={{ width: '100%', marginTop: '20px' }}></audio>
                        )}
                        <div style={{display:"flex", marginBottom:"20px"}}>                       
                            <Button
                            style={{  backgroundColor: isHovered ? '#fab005' : '#ffd43b',
                            padding: '0.75rem 1rem',
                            fontSize: '13px',
                            borderRadius: '0.3125rem',
                            fontFamily: 'inherit',
                            color: '#4b5157',
                            width: '300px',
                            border: '1px solid black',
                            borderRadius: '0.3rem',
                            boxShadow: isHovered ? '0px 8px 8px rgba(0, 0, 0, 0.25)' : 'none',}}               
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
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
                        color: 'white',
                        padding: '10px'
                    }}>
                        Maximum characters {maxChars} remaining {maxChars - text.length} available
                        {text && (
                            <button style={{
                                '--bs-text-opacity': 1,
                                color: 'white',
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
                    />
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
                        <InputAdornment position="end" style={{marginTop:"10px !important"}}>
                            <LoadCanvasTemplateNoReload style={{marginTop:"10px !important"}}/>
                            <IconButton onClick={() =>   loadCaptchaEnginge(5,"blue","white")} size="large" style={{marginTop:"10px !important"}}>
                                <RefreshIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                    }}
                    // onChange={(e) => {                   
                    //     handleCaptchaVerification(e.target.value);
                    // }}        
                  />
                </Container>
                <Container sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginTop: '20px' }}>
                <div style={{display:"flex"}}>
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
                <Button                 
                  style={{  backgroundColor: isHovered ? 'rgb(116, 141, 146)' : 'rgb(18, 78, 102)',
                  padding: '0.75rem 1rem',
                  fontSize: '13px',
                  borderRadius: '0.3125rem',
                  fontFamily: 'inherit',
                  color: 'white',
                  width: '300px',
                  border: '1px solid black',
                  borderTopLeftRadius: '0',
                  borderBottomLeftRadius: '0',
                  boxShadow: isHovered ? '0px 8px 8px rgba(0, 0, 0, 0.25)' : 'none',}}                 
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
                <div style={{position:"absolute",marginTop:"50px"}}>
                {isContainerOpen && (
                    <Container style={{
                        marginLeft: '-23px',
                        marginBottom: '20px',
                        marginTop:"10px"
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
                                    <MenuItem value="8khz_8bit_stereo">8 kHz, 8 Bit, Stereo</MenuItem>
                                    <MenuItem value="8khz_16bit_stereo">8 kHz, 16 Bit, Stereo</MenuItem>
                                    <MenuItem value="12khz_8bit_stereo">12 kHz, 8 Bit, Stereo</MenuItem>
                                    <MenuItem value="12khz_16bit_stereo">12 kHz, 16 Bit, Stereo</MenuItem>
                                    <MenuItem value="16khz_8bit_stereo">16 kHz, 8 Bit, Stereo</MenuItem>
                                    <MenuItem value="16khz_16bit_stereo">16 kHz, 16 Bit, Stereo</MenuItem>
                                    <MenuItem value="24khz_8bit_stereo">24 kHz, 8 Bit, Stereo</MenuItem>
                                    <MenuItem value="24khz_16bit_stereo">24 kHz, 16 Bit, Stereo</MenuItem>
                                    <MenuItem value="32khz_8bit_stereo">32 kHz, 8 Bit, Stereo</MenuItem>
                                    <MenuItem value="32khz_16bit_stereo">32 kHz, 16 Bit, Stereo</MenuItem>
                                    <MenuItem value="44khz_8bit_stereo">44 kHz, 8 Bit, Stereo</MenuItem>
                                    <MenuItem value="44khz_16bit_stereo">44 kHz, 16 Bit, Stereo</MenuItem>
                                    <MenuItem value="48khz_8bit_stereo">48 kHz, 8 Bit, Stereo</MenuItem>
                                    <MenuItem value="48khz_16bit_stereo">48 kHz, 16 Bit, Stereo</MenuItem>
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
                        </FormGroup>
                    </Container>
                    </Container>
                )}
                </div>
           
                </Container>
                </Container>                            
            </Container>
   
        </div>
        
    );
}

export default App;
