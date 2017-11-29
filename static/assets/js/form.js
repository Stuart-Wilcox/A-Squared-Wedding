$("#attSub").click(function(evt){
  evt.preventDefault();
  let name = $("#attName").val();
  let foodChoice = $("#attFc").val();
  let dietaryRestrictions = $("attDr").val();

  if(!name){
    $("#attSuc").html("");
    $("#attErr").html("<li>Please enter a name.</li><br /><br />");
    $("#attName").focus();
    return false;
  }
  if(!foodChoice || foodChoice == "null"){
    $("#attSuc").html("");
    $("#attErr").html("<li>Please select a meal option.</li><br /><br />");
    $("#attFc").focus();
    return false;
  }

  name = name.replace("<", "&lt;").replace(">", "&gt;");
  foodChoice = foodChoice.replace("<", "&lt;").replace(">", "&gt;");
  if(dietaryRestrictions){
    dietaryRestrictions = dietaryRestrictions.replace("<", "&lt;").replace(">", "&gt;");
  }

  let url = "/attending/";
  let method = "POST";
  let headers = new Headers({
    "Content-Type": "application/json"
  });
  let body = {
      name: name,
      foodChoice: foodChoice,
      dietaryRestrictions: dietaryRestrictions
  };
  body = JSON.stringify(body);
  fetch(url, {method: method, headers:headers, body: body}).then((resp)=>resp.json())
  .then(function(data){
      if(data.message == "suc"){
        $("#attErr").html("");
        $("#attSuc").html("<br /><li>Response successfully submitted. </li>");
      }else{
        $("#attErr").html("");
        $("#attSuc").html("<br /><li>Something went wrong. Response not submitted.</li>");
      }
  })
  .catch(function(err){
      console.log(err);
      $("attErr").html("");
      $("#attSuc").html("<br /><li>Something went wrong. Response not submitted.</li>");
  });
  return false;
});

$("#nattSub").click(function(evt){
  evt.preventDefault();

  let name = $("#nattName").val();
  let message = $("#nattMsg").val();

  if(!name){
    $("#nattSuc").html("");
    $("#nattErr").html("<li>Please enter a name.</li><br /><br />");
    $("#nattName").focus();
    return false;
  }
  if(!message){
    $("#nattSuc").html("");
    $("#nattErr").html("<li>Please enter a message.</li><br /><br />");
    $("#nattMsg").focus();
    return false;
  }

  let url = "/not-attending/";
  let method = "POST";
  let headers = new Headers({
    "Content-Type": "application/json"
  });
  let body = {
      name: name,
      message: message
  };
  body = JSON.stringify(body);
  fetch(url, {method:method, headers:headers, body:body}).then((resp)=>resp.json())
  .then(function(data){
      if(data.message == "suc"){
        $("#nattErr").html("");
        $("#nattSuc").html("<br /><li>Response successfully submitted.</li>");
      }else{
        $("#nattErr").html("");
        $("#nattSuc").html("<br /><li>Something went wrong. Response not submitted.</li>");
      }
  })
  .catch(function(err){
      console.log(err);
      $("#nattErr").html("");
      $("#nattSuc").html("<br /><li>Something went wrong. Response not submitted.</li>");
  });
  return false;
});
