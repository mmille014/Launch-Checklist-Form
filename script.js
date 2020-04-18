   
window.addEventListener("load", function () {
   let form = document.querySelector("form");
   let pilotName = document.getElementById("pilotName");
   let copilotName = document.querySelector("input[name=copilotName]");
   let fuelInput = document.querySelector("input[name=fuelLevel]");
   let cargoInput = document.querySelector("input[name=cargoMass]");
   let faultyItems = document.getElementById("faultyItems");
   let launchStatus = document.getElementById("launchStatus");
   let pilotStatus = document.getElementById("pilotStatus");
   let copilotStatus = document.getElementById("copilotStatus");
   let fuelStatus = document.getElementById("fuelStatus");
   let cargoStatus = document.getElementById("cargoStatus");
   let planetDataDisplay = document.getElementById("planetDataDisplay");
      
   form.addEventListener("submit", (event) => {
      event.preventDefault();
         
      if (pilotName.value === "" || copilotName.value === "" || fuelInput.value === "" || cargoInput.value === "") {
         alert("All fields are required to launch!");
      } else if (isNaN(Number(fuelInput.value)) || isNaN(Number(cargoInput.value))) {
         alert('Please use Numbers for the fuel and mass fields.');     
         
      } else {
         faultyItems.style.visibility = "visible";
         pilotStatus.innerHTML = `Pilot ${pilotName.value} is ready for launch`;
         copilotStatus.innerHTML = `Co-pilot ${copilotName.value} is ready for launch`;
      } 

      if (Number(fuelInput.value) <= 10000) {
         fuelStatus.innerHTML = "Fuel level is too low for launch";
      } else {
         fuelStatus.innerHTML = "Fuel level is ready for launch";
      }

      if (Number(cargoInput.value) >= 10000) {
         cargoStatus.innerHTML = "Cargo mass is too high for launch";
      } else {
         cargoInput.innerHTML = "Cargo mass is ready for launch";
      }

      if (Number(fuelInput.value) <= 10000 || Number(cargoInput.value) >= 10000) {
         launchStatus.innerHTML = "Shuttle Not Ready For Launch";
         launchStatus.style.color = "red";            
      } else {
            launchStatus.innerHTML = "Shuttle Ready For Launch";
            launchStatus.style.color = "green";
      }
   });   
      fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
         return (response.json());
      }) .then((data) => {
            let planet = data[Math.floor(Math.random() * data.length)];

            planetDataDisplay.innerHTML = 
            `<h2>Mission Destination</h2>
            <ol>
               <li>Name ${planet.name}</li>
               <li>Diameter: ${planet.diameter}</li>
               <li>Star: ${planet.star}</li>
               <li>Distance from Earth: ${planet.distance}</li>
               <li>Number of Moons: ${planet.moons}</li>
            </ol>
            <img src="${planet.image}">`
   });
});