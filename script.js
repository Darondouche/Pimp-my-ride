//informations concernant les trips
let tripsToParse = [
	"Roger 0 5 10",
	"Pongo 3 7 14",
	"Perdita 8 10 8",
	"Anita 16 3 7"
]

//creation du tableau trips (noms des keys), du tableau données + autres variables
let trips_keys = ['client','start','duration','price'];
let tableau_bdd = [];
let totalPrices = 0 ;

//création de la fonction pour récup les infos des trips
function parseTrips(tripsToParse){
    return tripsToParse.split(' ') ;
}

//je cree une fonction pour créer mon tableau d'objets clients
function toArray (tripsToParse, trips_keys){
    let idx = 0 ;
    while (idx < tripsToParse.length) {
        let objClient = {} ;
    for (let i = 0 ; i < trips_keys.length ; i++){
        //j'associe les clés aux valeurs 
        objClient[trips_keys[i]] = parseTrips(tripsToParse[idx])[i] ; 
    }
    //j'appelle la fonction pour convertir les valeurs en nombres
    toNumber(objClient) ; 
    //je calcul au fur et à mesure des itérations mon prix total
    getTripsPrice(objClient);
    //je push les objets dans mon tableau de données
    tableau_bdd.push(objClient) ;
    idx++ ; 
    }
    return tableau_bdd ; 
}

//je créé une fonction pour convertir les strings 2/3/4 en nombres
function toNumber(objClient){
    objClient.start = parseFloat(objClient.start);
    objClient.duration = parseFloat(objClient.duration);
    objClient.price = parseFloat(objClient.price);
    return objClient ;
}

//calcul des prix pour tous les voyages
function getTripsPrice(objClient){
    //à chaque itération j'ajoute la valeur du prix à la variable totalPrices
    totalPrices += objClient.price ;
}

toArray (tripsToParse, trips_keys);
//affichage du résultat : le tableau bdd 
console.log(tableau_bdd);

//affichage dans la page Html du total des prix 
document.getElementById('prices').innerHTML = "Total des prix des voyages : " + totalPrices + ".</br>" ; 

//creation de la fonction qui verifie les compatibilités 
//initialisation de la booléenne de vérification
let compatibility = false ;
function checkCompatibility(tripA, tripB){
    //je compare l'heure de départ avec (heure de départ + durée) de l'autre vol
    //dans les deux sens 
        if (tripB.start > (tripA.start + tripA.duration)){
                    compatibility = true ;
        } else if (tripA.start > (tripB.start + tripB.duration)){
                    compatibility = true ;
        } else {
                    compatibility = false ; 
        }
}

let compatibles = "";
let tab_compat = [] ;
let bestPrice = 0 ; 
let bestTrip = "" ; 
function findCompabilities(tableau_bdd){
    //pour chaque item du tableau bdd 
    for (var i = 0 ; i < tableau_bdd.length ; i++){
        //je le compare avec chaque item du tableau bdd
        for (var j = 0 ; j < tableau_bdd.length ; j++){
            checkCompatibility(tableau_bdd[i],tableau_bdd[j]);
            if (compatibility == true){
                compatibles = tableau_bdd[i].client + " + " + tableau_bdd[j].client ;
                //calcul du prix de la combinaison 
                let priceCombin = (tableau_bdd[i].price + tableau_bdd[j].price) ;
                findBestPrice(priceCombin) ; 
                //je push les résultats dans un tableau 
                tab_compat.push(compatibles + priceCombin) ;
                }
            }
        }
    console.log(tab_compat);
    return tab_compat ; 
}

findCompabilities(tableau_bdd);
//affichage dans la page Html des combinaisons possibles
document.getElementById('compatibilities').innerHTML = "Les combinaisons de voyage possibles sont " + tab_compat.join(", ") + ".</br>" ; 

//fonction qui trouve la combinaison la plus avantageuse
function findBestPrice(priceCombin){
    if (bestPrice < priceCombin){
        bestPrice = priceCombin ; 
        bestTrip = compatibles + " = " + bestPrice ;
    }
    return bestTrip ; 
}

//affichage dans la page Html de la meilleure combinaison
document.getElementById('bestTrip').innerHTML = "La combinaison la plus avantageuse est " + bestTrip + ".</br>" ; 
