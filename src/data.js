export const API_KEY = 'AIzaSyAClH6PUYNUapYUXlXeyITmIbXIHEAeMN4';


const value_converter=(value)=>{
    if(value>=1000000){
        return Math.floor(value/1000000)+"M";
    }
    else if(value>=1000){
        return Math.floor(value/1000)+"M";
    }
    else{
        return value;
    }
}