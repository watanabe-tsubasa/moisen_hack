interface patientLog {
  "userId": string,
  "displayName": string,
  "summry": {
    "fromWhen": string,
    "how": string,
    "amountOfPain": string,
    "others": string
  },
  "talkLog": 
    { "speaker": "看護師" | "患者", "message": string}[]
}