document.getElementById('submit').addEventListener('click', {
  handleEvent: function (event) {
    let name = value("name");
    let price = valueN("price");
    let education = valueN("education");
    let networth = valueN("networth");
    let letter = value("letter")
    let reqiured = [
      name == '',
      price < 0 || isNaN(price),
      education == 0,
      networth == 0,
    ]
    if(reqiured.every(a => a === false)){
      price *= education
      price *= networth
      price = skills(price)
      price = age(price)
      price = reputation(price)
      price = price.toFixed(2)
      let person = {name, price, letter}
      document.getElementById("result").innerHTML = `
        <div>
          <center>
            <h2>${person.name}, result is:</h2>
            <h1>$${person.price}</h1>
            <div class="border">
              <p>${person.letter}</p>
            </div>
            <br>
            <button onclick="print()" class="print">
              Print!
            </button>
          </center>
        </div>
      `
      console.log(person)
    }
    else {
      let cases = []
      let names = ["Name", "Starting bid", "Education level", "Family networth", "Age"]
      reqiured.map((a, i) => a ? cases.push(names[i]) : '')
      alert(`Please enter all the required details:\n${cases.join(", ")}.`)
    }
  }
});

const skills = (price) => {
    let list = Array.from(document.getElementsByClassName("skills"))
    let result = list.reduce((price, item) => {
        return price + parseFloat(item.checked ? parseFloat(item.value) : 0 )
    }, price)
    return result;
}

const age = (price) => {
    document.getElementsByName("age").forEach(item => {
      price *= item.checked ? parseFloat(item.value) : 1
    })
    return price;
}

const reputation = (price) => {
    let selected = ""
    let elements = document.getElementsByClassName("reputation")
    for (let i=0; i < elements.length; i++) {
      item = elements[i]
      val = parseFloat(item.value)
      if(item.checked){
        val < 0 ? (price += val) : (price *= val)
      }
    }
    return price;
}

const valueN = (id) => {
    return parseFloat(document.getElementById(id).value)
}

const value = (id) => {
    return document.getElementById(id).value
}
