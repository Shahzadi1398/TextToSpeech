import React, { useState, useEffect } from 'react';
import { AppBar, Container, Toolbar, Typography, TextField, MenuItem, Select, IconButton, InputAdornment, Button } from '@mui/material';
import styled from '@emotion/styled';
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from 'react-simple-captcha';

import RefreshIcon from '@mui/icons-material/Refresh';

const apiKey = '332c16d1a8db4a10b44047fd0888b485';

const languages = [
  { value: 'en-us', label: 'English' },
  { value: 'zh-cn', label: '中文 - Simplified and Traditional Chinese' },
  { value: 'es-es', label: 'Español - Spanish' },
  { value: 'pt-br', label: 'Portugues - Brazilian Portuguese' },
  { value: 'de-de', label: 'Deutsch - German' },
  { value: 'fr-fr', label: 'Français - French' },
  { value: 'it-it', label: 'Italiano - Italian' },
  { value: 'tr-tr', label: 'Türk - Turkish' },
  { value: 'ru-ru', label: 'Русский - Russian' },
  { value: 'ja-jp', label: '日本 - Japanese' },
  { value: 'ko-kr', label: '한국의 - Korean' },
  { value: 'ms-my', label: 'Melayu - Malay' },
  { value: 'th-th', label: 'ภาษาไทย - Thai' },
  { value: 'vi-vn', label: 'Tiếng Việt - Vietnamese' },
  { value: 'id-id', label: 'bahasa Indonesia - Indonesian' },
  { value: 'he-il', label: 'בעברית - Hebrew' },
  { value: 'fi-fi', label: 'Suomi - Finnish' },
  { value: 'sv-se', label: 'Svenska - Swedish' },
  { value: 'nb-no', label: 'Norsk - Norwegian' },
  { value: 'da-dk', label: 'Dansk - Danish' },
  { value: 'hi-in', label: 'हिंदी - Hindi' },
  { value: 'ar', label: 'العربية - Arabic' },
  { value: 'ro-ro', label: 'Română - Romanian' },
  { value: 'hu-hu', label: 'Magyar - Hungarian' },
  { value: 'pl-pl', label: 'Polski - Polish' },
  { value: 'nl-nl', label: 'Nederlands - Dutch' },
  { value: 'cs-cz', label: 'Čeština - Czech' },
  { value: 'uk-ua', label: 'Українська - Ukrainian' },
  { value: 'hr-hr', label: 'Hrvatski - Croatian' },
  { value: 'el-gr', label: 'Ελληνικά - Greek' },
  { value: 'sk-sk', label: 'Slovenčina - Slovak' },
  { value: 'bg-bg', label: 'Български - Bulgarian' },
  { value: 'sl-si', label: 'Slovenščina - Slovenian' },
  { value: 'ca-es', label: 'Català - Catalan' },
  { value: 'ga-ie', label: 'Gaeilge - Irish' },
  { value: 'lt-lt', label: 'Lietuvių - Lithuanian' },
  { value: 'mt-mt', label: 'Malti - Maltese' },
  { value: 'et-ee', label: 'Eesti - Estonian' },
  { value: 'is-is', label: 'Íslenska - Icelandic' },
  { value: 'lv-lv', label: 'Latviešu - Latvian' },
  { value: 'ur-in', label: 'اردو - Urdu' },
  { value: 'ta-in', label: 'தமிழ் - Tamil' },
  { value: 'mr-in', label: 'मराठी - Marathi' },
  { value: 'te-in', label: 'తెలుగు - Telugu' },
  { value: 'gu-in', label: 'ગુજરાતી - Gujarati' },
  { value: 'ml-in', label: 'മലയാളം - Malayalam' },
  { value: 'kn-in', label: 'ಕನ್ನಡ - Kannada' },
  { value: 'bn-bd', label: 'বাংলা - Bengali' },
  { value: 'fa-ir', label: 'فارسی - Persian' },
  { value: 'fil-ph', label: 'Filipino - Filipino' },
  { value: 'sw-ke', label: 'Kiswahili - Swahili' }
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
    const [filteredLanguages, setFilteredLanguages] = useState(languages);
    const maxChars = 3000;
    const [speech, setSpeech] = useState('');

    const handleChange = (event) => {
        setText(event.target.value);
    };

    useEffect(() => {
      loadCaptchaEnginge(6);
  }, []);


    const handleLanguageSearch = (event) => {
        const query = event.target.value.toLowerCase();
        const filtered = languages.filter(language =>
            language.label.toLowerCase().includes(query)
        );
        setFilteredLanguages(filtered);
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

    const handleConvertToSpeech=() =>{
      const audioSrc = `http://api.voicerss.org/?key=${apiKey}&src=${text}`

      setSpeech(audioSrc);
    }

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
                        <audio controls autoPlay name="media" style={{ width: '100%', marginTop: '20px' }}>
                          <source src={speech} type="audio/wav" />
                            Your browser does not support the audio element.
                        </audio>
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
                            defaultValue="en-us"
                            className="custom-select"
                            style={{
                                width: '380px',
                            }}
                            onChange={handleLanguageSearch}
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
                            <LoadCanvasTemplate/>
                            <IconButton onClick={() => loadCaptchaEnginge(6)} size="large">
                                <RefreshIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                    }}
                  />
                </Container>
                <Container sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginTop: '20px' }}>
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
                  // onClick={handleMoreSettingToggle}
                >
                  <i className="bi bi-sliders p-1"  style={{
                    padding: '0.25rem !important',
                    fontStyle: 'italic',
                    fontSize: '.875rem',
                    marginRight: '10px',
                  }}></i> More Setting
                </Button>
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
                  onClick={handleConvertToSpeech}
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
