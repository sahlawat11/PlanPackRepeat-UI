export class Itinerary{
  constructor(private itineraryId?: String , private itineraryName?: String, private destinations?: Destination[] ) {

  }
}

export class Destination{
  constructor(private destinationName?:String , private imageSourceUrl ?: String) {

 }
}