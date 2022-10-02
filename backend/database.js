import { MongoClient, ObjectId } from "mongodb";

const url = "mongodb+srv://sera:Seraphim11@cluster0.yybef.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);

export class database {
  static getIdeas() {
    return new Promise( ( resolve, reject ) => {
      client.connect( ( err, client ) => {
          const db = client.db( "ToDoApp" );
          const collection = db.collection( "IdeasList" );
          collection.find().toArray( ( err, res ) => {
            if( !err ) {
              resolve( res );
            } else {
              reject( err );
            }
          })
       })
    });
  }

  static getIdeasTypes() {
    return new Promise( ( resolve, reject ) => {
      client.connect( ( err, client ) => {
          const db = client.db( "ToDoApp" );
          const collection = db.collection( "IdeasTemplate" );
          collection.find().toArray( ( err, res ) => {
            if( !err ) {
              let result = [];
              
              for(let i = 0; i < res.length; i++) {
                result.push(res[i].type)
              }

              resolve( result );
            } else {
              reject( err );
            }
          })
       })
    });
  }

  static getTemplatesIdeas() {
    return new Promise( ( resolve, reject ) => {
      client.connect( ( err, client ) => {
          const db = client.db( "ToDoApp" );
          const collection = db.collection( "IdeasTemplate" );
          collection.find().toArray( ( err, res ) => {
            if( !err ) {
              resolve( res );
            } else {
              reject( err );
            }
          })
       })
    });
  }

  static uploadActiveIdeas( documents ) {
    return new Promise( ( resolve, reject ) => {
      client.connect( ( err, client ) => {
          const db = client.db( "ToDoApp" );
          const collection = db.collection( "IdeasList" )
          
          for( let i = 0; i < documents.length; i++ ) {
            if( !documents[i].hasOwnProperty("_id")) {
              collection.insertOne(documents[i])
            }
          }

          resolve( true )
      })
    })
  }
}