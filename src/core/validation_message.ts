const validation_message = (errorMessages : any) => {
    let messages: any[] = [];
    errorMessages = errorMessages.map((e: { constraints: any; }) => e.constraints);
    for (let iterator of errorMessages) {
        messages = messages.concat(Object.values(iterator));        
    }    
    return messages;
}

export default validation_message;