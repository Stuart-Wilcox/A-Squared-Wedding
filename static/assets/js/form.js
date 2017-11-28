function doFormSubmit(event, formName){
    event.preventDefault();
    if(formName === "attending"){
        //TODO: scrub name & dietaryRest.
        //TODO: validate foodChoice
        let url = "/attending";
        let method = "POST";
        let headers = new Headers().append("Content-Type","application/json");
        let body = {
            name: event.target.name.value,
            foodChoice: event.target.foodChoice.value,
            dietaryRestrictions: event.target.dietaryRestrictions.value        
        };
        
        fetch(url, {method: method, headers:headers, body: body}).then((resp)=>resp.json())
        .then(function(data){
            console.log(data); 
        })
        .catch(function(err){
            console.log(err);
        });
    }else if(formName === "not-attending"){
        //TODO: scrub name & message
        let url = "/not-attending";
        let method = "POST";
        let headers = new Headers().append("Content-Type", "application/json");
        let body = {
            name: event.target.name.value,
            message: event.target.message.value
        };    
        
        fetch(url, {method:method, headers:headers, body:body}).then((resp)=>resp.json())
        .then(function(data){
            console.log(data);
        })
        .catch(function(err){
            console.log(err);        
        });
    }
}
