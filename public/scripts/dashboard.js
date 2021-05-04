

function graph(data) {

    document.addEventListener('DOMContentLoaded', function () {

        jsonObject = JSON.parse(data);

        var date = new Date();
        dateFormat = date.getFullYear() + "-" + ('0' + (date.getMonth() + 1)).slice(-2) + "-" + ('0' + date.getDate()).slice(-2);

        var dateControl = document.getElementById('dateCalendar');

        var ctx = document.getElementById("myChart").getContext("2d");

        var historylist = document.getElementById("history-list");

        
        dateControl.value = dateFormat;

        dateControl.setAttribute('min', jsonObject['dates'][0]['date'])
        dateControl.setAttribute('max', dateFormat);


        var index = -1
        for (i in jsonObject['dates']) {

            if (jsonObject['dates'][i]['date'] == dateFormat) {
                index = i;

            }

           

        };

        var jsonGlucose = [];
        var timestamps = [];
        var carbs = [];

        if (index != -1) {

            var jsonGluLength = jsonObject['dates'][index]['glucosedata'].length;
        
            for (i = 0; i < jsonGluLength; i++) {
                jsonGlucose.push(parseFloat(jsonObject['dates'][index]['glucosedata'][i]['glucoselevels']));
                timestamps.push(jsonObject['dates'][index]['glucosedata'][i]['timestamps']);
                carbs.push(parseFloat(jsonObject['dates'][index]['glucosedata'][i]['carbs']));
            }

            
            var html = '';

        
            jsonObject['dates'][index]['glucosedata'].map(match => {
    
            html +=
                `
                <div class="box">
                    <h4>Glucose Level: ${match.glucoselevels}  <p style="text-align: center;" >Carbs ${match.carbs}</p>  </h4> 
                    <h>${match.timestamps} </h>
        
                </div>

                `
    
            }).join('');
        

            historylist.innerHTML = html


        }

        if (jsonObject['diabetic'] == true) {
            var topAnnotation = 180;
            var sugMax = 200;
            var topAnnotationText = "High Value (Hyperglycemia)";
            var btmAnnotationText = "Low Value (Hypoglycemia)";

        }
        else {
            var topAnnotation = 140;
            var sugMax = 160;
            var topAnnotationText = "High Value (Hyperglycemia)";
            var btmAnnotationText = "Low Value (Hypoglycemia)";
        }

    
        

        var myChart = new Chart(ctx, {

            // The type of chart we want to create
            type: "line",
            // The data for our dataset
            data: {
                labels: timestamps,
                datasets: [
                    {
                        label: "Glucose mg/dL",
                        fill: false,
                        borderColor: "rgb(255, 99, 132)",
                        data: jsonGlucose,
                    },
                    {
                        label: "Carbs",
                        fill: false,
                        borderColor: "rgb(0, 191, 255)",
                        data: carbs,

                    },
                ],
            },
            // Configuration options go here
            options: {

                title: {
                    display: true,
                    text: "Blood Glucose Chart"
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            suggestedMin: 20,
                            suggestedMax: sugMax
                        }
                    }]
                },
                annotation: {
                    annotations: [
                        {
                            id: 'btmLine',
                            type: 'line',
                            mode: 'horizontal',
                            scaleID: 'y-axis-0',
                            value: 50,
                            borderColor: 'red',
                            borderWidth: 2,
                            borderDash: [4, 8],
                            label: {
                                backgroundColor: "red",
                                content: btmAnnotationText,
                                enabled: true
                            }
                        }, {
                            id: 'topLine',
                            type: 'line',
                            mode: 'horizontal',
                            scaleID: 'y-axis-0',
                            value: topAnnotation,
                            borderColor: 'red',
                            borderWidth: 2,
                            borderDash: [4, 8],
                            label: {
                                backgroundColor: "red",
                                content: topAnnotationText,
                                enabled: true
                            }
                        }
                    ]
                }
            },
        });

        
        dateControl.addEventListener("change", function() {
            
            historylist.innerHTML = '';
            dateFormat = dateControl.value.toString();
            dateFormat = dateFormat.split(/-/);
            dateFormat = dateFormat[0] + "-" + ('0' + parseInt(dateFormat[1]).toString()).slice(-2) + "-" + ('0' +  dateFormat[2].toString()).slice(-2); // remove leading zero from month
            
            
            var updatedIndex = -1;
            for (j in jsonObject['dates']) {
                if (jsonObject['dates'][j]['date'] == dateFormat) {
                    updatedIndex = j;
                }
            };

            
            jsonGlucose.length = 0;
            timestamps.length = 0;
            carbs.length = 0;

            if (updatedIndex == -1){
                myChart.data.labels = timestamps;
                myChart.data.datasets[0].data = jsonGlucose;
                myChart.data.datasets[1].data = carbs;
            }
            else {
                jsonGluLength = jsonObject['dates'][updatedIndex]['glucosedata'].length;

                for (i = 0; i < jsonGluLength; i++) {
                    jsonGlucose.push(parseFloat(jsonObject['dates'][updatedIndex]['glucosedata'][i]['glucoselevels']));
                    timestamps.push(jsonObject['dates'][updatedIndex]['glucosedata'][i]['timestamps']);
                    carbs.push(parseFloat(jsonObject['dates'][updatedIndex]['glucosedata'][i]['carbs']));
                }
    
                myChart.data.labels = timestamps;
                myChart.data.datasets[0].data = jsonGlucose;
                myChart.data.datasets[1].data = carbs;

                
                

                var html = '';

    
                jsonObject['dates'][updatedIndex]['glucosedata'].map(match => {
    
                    html +=
                        `
                        <div class="box">
                            <h4>Glucose Level: ${match.glucoselevels}  <p style="text-align: center;" >Carbs ${match.carbs}</p>  </h4> 
                            <h>${match.timestamps} </h>
        
                        </div>

                        `
    
                }).join('');
        

                historylist.innerHTML = html
                

            }

            myChart.update();
        })

    });
}





function clock() {
    var today = new Date();
    var hours = today.getHours()
    var minutes = today.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours != 0 ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    timestamp = 'Time: ' + hours.toString() + ':' + minutes.toString() + ' ' + ampm;


    document.getElementById('txt').innerHTML = timestamp;
    var t = setTimeout(clock, 500);

}


function notifications(data, firsttime) {

    if (firsttime == "true") {

        jsonObject = JSON.parse(data);

        //TODO Add index for date value
        //TODO Currently just testing
        var index = -1
        for (i in jsonObject['dates']) {
            if (!jsonObject['dates'][i]['glucosedata'].length == 0){
                index = i;
            }
        }


        if (index == -1){
            return;
        }

        var jsonGluLength = jsonObject['dates'][index]['glucosedata'].length;
        var jsonGlucose = [];

        for (i = 0; i < jsonGluLength; i++) {
            jsonGlucose.push(parseFloat(jsonObject['dates'][index]['glucosedata'][i]['glucoselevels']));
        }

        const diabetic = jsonObject['diabetic'];
        const glucoselevel = jsonGlucose.slice(-1)[0];


        const low = [
            "Monitor blood sugar levels before & after exercise to increase awareness of how exercise affects blood sugar levels.",
            "Alcohol can make hypoglycemic medications less effective, take extra care when drinking",
            "When drinking, monitor your blood glucose as alcohol can interfere with diabetes medication & insulin",
            "Fasting may not be suitable for those on antidiabetic medications associated with hypoglycemia.",
            "Skipping meals can lead to immediately dangerous blood sugar swings.",
            "Drinking alcohol on an empty stomach can lead to hypoglycemia, especially if you take medications for hypoglycemia.",
            "Exercise increases insulin sensitivity &amp; helps muscles use glucose effectively, which can lead to reduced blood sugar levels.",
            "Not getting enough carbohydrates can lead to hypoglycemia.",
            "Eating foods with less carbohydrate than usual without adjusting insulin intake can lead to hypoglycemia.",
            "Time your insulin based on whether your carbs are from liquids or solids. Liquids are absorbed much faster than solids, which can affect blood sugar levels.",
            "Eating or drink 15 to 20 grams of fast-acting carbohydrates, such as glucose tablets, fruit juice, regular soda, honey, or sugary candy to get your blood sugar up.",
            "Having a snack or meal once your blood sugar is normal, can help stabilize it and replenish your body's glycogen stores.",
            "When trying to raise blood sugar, avoid high fiber or high fat carbs, as fiber & fat slow down the absorption of sugar.",
            "Check your blood sugar often when lows are more likely, such as when the weather is hot or when you travel.",
            "Carry supplies for treating low blood sugar at all times, such as glucose tablets, hard candy, juice boxes or regular soda, or fruit.",
            "Wear a medical ID just in case you pass out or are otherwise unable to self-administer solutions for low blood sugar.",
            "Make sure family and friends are aware of your condition and know how to help in case of an emergency.",
            "Stay hydrated. Drinking enough water may help you keep your blood sugar levels within healthy limits.",
            "Eating foods rich in chromium and magnesium regularly can help prevent deficiencies and reduce the risk of blood sugar problems.",
            "Try to maintain a regular meal schedule in order to help your body regulate blood sugar levels."
        ]

        const normal = [
            "Stay hydrated! Drinking enough water may help you keep your blood sugar levels within healthy limits.",
            "Remember to eat foods rich in chromium & magnesium regularly to help prevent deficiencies & reduce the risk of blood sugar problems.",
            "Avoid processed foods & stick to a diet full of fresh fruits & vegetables, complex carbohydrates, healthy fats, high-fiber foods & healthy proteins.",
            "Maintaining a healthy weight is essential to managing your blood sugar levels.",
            "More weight around your abdomen is closely linked to insulin resistance.",
            "Watch out for added sugars in the foods you consume.",
            "Try to limit your consumption of processed meats & red meats.",
            "Try to limit refined carbohydrates like white bread, pasta, & rice, as well as soda, candy, packaged meals, & snack foods.",
            "High-fiber complex carbohydrates are digested more slowly, thus preventing your body from producing too much insulin.",
            "Don’t underestimate the calories & carbs in alcoholic drinks, including beer & wine.",
            "Starting your day off with a good breakfast will provide energy as well as steady blood sugar levels.",
            "Try to keep your calorie intake the same on a daily basis to regulate blood sugar levels.",
            "Try keeping a food diary for easier weight management, increasing your nutritional knowledge.",
            "Try reducing your use of artificial sweeteners.",
            "Try to find non-food related ways to reduce stress, which increases insulin sensitivity, such as exercise, meditation or deep breathing.",
            "Try to maintain a regular meal schedule in order to help your body regulate blood sugar levels.",
            "Get some rest! Lack of sleep can increase stress and lower insulin, thus raising blood sugar.",
            "Exercise increases insulin sensitivity and helps your muscles use glucose effectively.",
            "Check your blood sugar levels regularly to increase your awareness."
        ]

        const high = [
            "Avoid processed foods & stick to a diet full of fresh fruits & vegetables, complex carbohydrates, healthy fats, high-fiber foods & healthy proteins.",
            "Maintaining a healthy weight is essential to managing your blood sugar levels.",
            "More weight around your abdomen is closely linked to insulin resistance.",
            "Watch out for added sugars in the foods you consume.",
            "Try to limit your consumption of processed meats & red meats.",
            "Try to limit refined carbohydrates like white bread, pasta, & rice, as well as soda, candy, packaged meals, & snack foods.",
            "High-fiber complex carbohydrates are digested more slowly, thus preventing your body from producing too much insulin.",
            "If you are planning on eating dessert, cut back on the carbs in your main meal.",
            "Don’t underestimate the calories & carbs in alcoholic drinks, including beer & wine.",
            "When drinking, monitor your blood glucose as alcohol can interfere with diabetes medication & insulin.",
            "Starting your day off with a good breakfast will provide energy as well as steady blood sugar levels.",
            "Try to keep your calorie intake the same on a daily basis to regulate blood sugar levels.",
            "Try keeping a food diary for easier weight management, increasing your nutritional knowledge.",
            "Exercise can help you manage your weight and may improve insulin sensitivity.",
            "Try reducing your use of artificial sweeteners.",
            "Try to find non-food related ways to reduce stress, which increases insulin sensitivity, such as exercise, meditation or deep breathing.",
            "Try to maintain a regular meal schedule in order to help your body regulate blood sugar levels.",
            "Get some rest! Lack of sleep can increase stress and lower insulin, thus raising blood sugar.",
            "Stay hydrated. Drinking enough water may help you keep your blood sugar levels within healthy limits.",
            "Eating foods rich in chromium and magnesium regularly can help prevent deficiencies and reduce the risk of blood sugar problems."
        ]



        document.addEventListener('DOMContentLoaded', function () {


            const notification = document.getElementById('notification');

            var divclass = "notification is-danger is-light";

            var message = "<u>FeedBack tip:</u> <br>"


            if (diabetic === true) {

                //high
                if (glucoselevel >= 200) {
                    notification.innerHTML =
                        `
                            <div class="${divclass}">
                                <button class="delete"></button>
                                ${message}
                                ${high[Math.floor(Math.random() * high.length)]}   
                                            
                            </div>

                        `
                }

                //normal
                else if (glucoselevel >= 127) {
                    notification.innerHTML =
                        `
                            <div class="${divclass}">
                                <button class="delete"></button>
                                ${message}
                                ${normal[Math.floor(Math.random() * normal.length)]}   
                                            
                            </div>

                        `
                }

                //low
                else if (glucoselevel <= 126) {
                    notification.innerHTML =
                        `
                            <div class="${divclass}">
                                <button class="delete"></button>
                                ${message}
                                ${low[Math.floor(Math.random() * low.length)]}   
                                            
                            </div>

                        `
                }
            }

            else if (diabetic === false) {
                //high
                if (glucoselevel >= 140) {
                    notification.innerHTML =
                        `
                            <div class="${divclass}">
                                <button class="delete"></button>
                                ${message}
                                ${high[Math.floor(Math.random() * high.length)]}   
                                            
                            </div>

                        `
                }

                //normal
                else if (glucoselevel >= 81) {
                    notification.innerHTML =
                        `
                            <div class="${divclass}">
                                <button class="delete"></button>
                                ${message}
                                ${normal[Math.floor(Math.random() * normal.length)]}   
                                            
                            </div>

                        `
                }

                //low
                else if (glucoselevel <= 80) {
                    notification.innerHTML =
                        `
                            <div class="${divclass}">
                                <button class="delete"></button>
                                ${message}
                                ${low[Math.floor(Math.random() * low.length)]}   
                                            
                            </div>

                        `
                }
            }

            var closebtns = notification.getElementsByClassName('delete');

            for (i of closebtns) {
                i.addEventListener("click", function () {
                    this.parentNode.remove();
                });
            }
        })
    }
}
