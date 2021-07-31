function createInput() {
    var el = document.getElementById("dfAmount").value; //Descriptive features amount
    
    if (el == '' || el < 0 ) {
        document.querySelector(".errorMsg").innerHTML = "Enter the amount of Descriptive features first!";
    } else {
        var n = el && parseInt(el, 10);
        if (isNaN(n)) {
            return;
        }
        var input, i;
        var parent = document.getElementById("parent");
        var parent2 = document.getElementById("parent2");
        var par = document.getElementById("par");
        var prDetails = document.getElementById("prDetails");
        var edDetails = document.getElementById("edDetails");
        var target_par = document.getElementById("target_par");

        // Create w input
        for (i = 0; i <= n; i++) {
            input = document.createElement('input');
            input.setAttribute('type', 'number');
            input.setAttribute('class', 'input_box');
            input.setAttribute('placeholder', 'Value of [w'+i+']');
            input.setAttribute('id', 'w'+i);
            parent.appendChild(input);

            input = document.createElement("P");
            input.setAttribute('id', 'p'+i);
            par.appendChild(input);

            input = document.createElement("P");
            input.setAttribute('id', 'pr_p'+i);
            prDetails.appendChild(input);

            input = document.createElement("P");
            input.setAttribute('id', 'ed_p'+i);
            edDetails.appendChild(input);

        }
        //Create target feature input
        input = document.createElement('input');
        input.setAttribute('type', 'number');
        input.setAttribute('class', 'input_box');
        input.setAttribute('placeholder', 'Target Feature');
        input.setAttribute('id', 'target');
        target_par.appendChild(input);
        
       // Create d input
        for (i = 1; i <= n; i++) {
            input = document.createElement('input');
            input.setAttribute('type', 'number');
            input.setAttribute('class', 'input_box');
            input.setAttribute('placeholder', 'Value of [d'+i+']');
            input.setAttribute('id', 'd'+i);
            parent2.appendChild(input);
        }

        document.querySelector(".errorMsg").innerHTML = '';

    }
}

function LinearRegression() {
    var n = document.getElementById("dfAmount").value; //input amount
    if (n>0) {
        var prediction, w=[], d=[], sum=0, prod, _error, sq_error, _w=[], value, i;
        var targetF = Number(document.getElementById("target").value); //target amount

        for (i = 0; i <= n; i++) {
           
            d[0]=1; 
            w[i] = Number(document.getElementById('w'+i).value);
            if(i < n){
                d[i+1] = Number(document.getElementById('d'+(i+1)).value);
            }
            
            prod = w[i] * d[i];   
            sum = sum + prod;

            var detailsPR;
            detailsPR = "w["+i+"]&#215;d["+i+"]= " + w[i] +"&#215;"+ d[i] +" => "+ prod;
            document.getElementById("pr_p"+i).innerHTML = detailsPR;
           
        }
        prediction = sum;
        _error = targetF - prediction;
        sq_error = _error * _error;

        for (i = 0; i <= n; i++) {
            d[0]=1;
            if(i < n){
                d[i+1] = Number(document.getElementById('d'+(i+1)).value);
            }
            value = _error * d[i];
            _w[i] = value.toFixed(2);

            var detailsED;
            detailsED = "w["+i+"] = "+_error+"&#215;"+d[i]+" => "+ _w[i];
            document.getElementById("ed_p"+i).innerHTML = detailsED;
           
        }
        
        visibleTable();
        document.querySelector("#output1").innerHTML = targetF.toFixed(2);
        document.querySelector("#output2").innerHTML = prediction.toFixed(2);
        document.querySelector("#output3").innerHTML = _error.toFixed(2);
        document.querySelector("#output4").innerHTML = sq_error.toFixed(2);
        for (i = 0; i <= n; i++) {  
            document.getElementById("p"+i).innerHTML = "w["+ i +"]: "+ _w[i];
            //Style
            var p = document.getElementById("p"+i);
            p.style.fontSize = "18px";
            p.style.color = "green";
            p.style.fontWeight = "bold";

            var p = document.getElementById("pr_p"+i);
            p.style.fontSize = "18px";

            var p = document.getElementById("ed_p"+i);
            p.style.fontSize = "18px";
        }
        //Details calculation
        document.querySelector("#title").innerHTML = "Details Calculation";
        document.querySelector("#prTitle").innerHTML = "Prediction Calculation";
        document.querySelector("#pr").innerHTML = "Prediction => "+ prediction;
        document.querySelector("#edTitle").innerHTML = "Error Delta Part Calculation";
        document.querySelector(".errorMsg").innerHTML = '';
        
    } else {
        document.querySelector(".errorMsg").innerHTML = "Enter the amount of Descriptive features! ";
    }
}

function getWeight(){
    var oldw,learningRate,errorDelta, new_w;
    oldw = Number(document.getElementById("oldw").value); 
    learningRate = Number(document.getElementById("learning").value); 
    errorDelta = Number(document.getElementById("errorDelta").value); 
    if(oldw=='' || learningRate=='' || errorDelta==''){
        document.querySelector(".errorMsg").innerHTML = "Enter all field";
    }
    else{
        new_w = oldw + (learningRate*errorDelta);
        document.querySelector("#weight").innerHTML = "w[new]: "+ new_w;
        document.querySelector(".errorMsg").innerHTML = "";
    }
}

function confusionMatrix(){
    var  TP, TN, FP, FN, precision, recall, f1Score, accuracy, rp1, rp2, total;
    TP = Number(document.getElementsByName("inp")[0].value);
    TN = Number(document.getElementsByName("inp")[1].value);
    FP = Number(document.getElementsByName("inp")[2].value);
    FN = Number(document.getElementsByName("inp")[3].value);

    if(TP=='' || TN=='' || FP=='' || FN=='')
    {
        document.querySelector(".errorMsg").innerHTML = "Enter all field";
    }
    else{
       
        precision = TP/(TP+FP);
        recall= TP/(TP+FN);
    
        rp1 = precision*recall;
        rp2 = precision+recall;
        f1Score = (2*rp1)/rp2;
    
        total = TP+TN+FP+FN;
        accuracy = (TP+TN)/total;
    
        visibleTable();
        document.querySelector("#output1").innerHTML = precision.toFixed(2);
        document.querySelector("#output2").innerHTML = recall.toFixed(2);
        document.querySelector("#output3").innerHTML = f1Score.toFixed(2);
        document.querySelector("#output4").innerHTML = accuracy.toFixed(2);
        document.querySelector(".errorMsg").innerHTML = "";

        //Details Calculation
        var dtl_precision, dtl_recall, dtl_f1,dtl_accuracy, allValue;

        allValue = "True Positive (TP)= "+ TP 
        +"<br> True Negative (TN)= "+ TN 
        +"<br> False Positive (FP)= "+ FP 
        +"<br> False Negative (FN)= "+ FN;

        dtl_precision = "Precision <br>=> "+ TP +"&#247;("+ TP +"&#43;"+ FP +") <br> => "+ precision;
        dtl_recall = "Recall <br>=> "+ TP +"&#247;("+ TP +"&#43;"+ FN +") <br> => "+ recall;
        dtl_f1 = "F1-score <br>=> (2&#215;"+ precision.toFixed(2) +"&#215;"+ recall.toFixed(2) +")&#247;("+ precision.toFixed(2) +"&#43;"+ recall.toFixed(2) +") <br> => "+ f1Score;
        dtl_accuracy = "Classification accuracy <br>=> ("+ TP +"&#43;"+ TN +")&#247;("+ TP
        + "&#43;"+ TN +"&#43;"+ FP +"&#43;"+ FN +")<br> => "+ accuracy;

        document.querySelector("#title").innerHTML = "Details Calculation";
        document.querySelector("#value").innerHTML = allValue;
        document.querySelector("#precision").innerHTML = dtl_precision;
        document.querySelector("#recall").innerHTML = dtl_recall;
        document.querySelector("#f1").innerHTML = dtl_f1;
        document.querySelector("#accuracy").innerHTML = dtl_accuracy;
        
    }
}

function visibleTable(){
    //Visible table
    var x = document.querySelector("#Table");
    x.style.visibility = "visible";
    var y = document.getElementsByTagName("td");
    for (i = 0; i < y.length; i++) {
        y[i].style.border = "1px solid #dddddd";
    } 
}
