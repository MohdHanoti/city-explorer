import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

class Main extends React.Component{

    constructor(props){
        super(props);
        this.state = {
          display_name : '',
          lat : '',
          lon : '',
          errFlag : false,
          mapFlag : false
        }
      }

    getLocationData = async  (event) => {
        event.preventDefault();
        

        const cityName = event.target.cityName.value;
        
        //send request to the third party
        const key = 'pk.1644f720ad6e2ed3a74e6caa9254b1e4';
        const URL = `https://us1.locationiq.com/v1/search?key=${key}&q=${cityName}&format=json`
       
        try 
        {
          let resResult = await axios.get(URL);
          this.setState({
            display_name : resResult.data[0].display_name,
            lat : resResult.data[0].lat,
            lon : resResult.data[0].lon,
            mapFlag : true
          })
        }
        catch
        {
          console.log('err');
          this.setState({
            errFlag : true
          })
        }
   
       
       
   
      }


    render(){
        return(
            <div>
            <Form onSubmit={this.getLocationData}>
      <Form.Group >
        <Form.Label>Enter the name of the city: </Form.Label>
        <Form.Control name="cityName" type="text" placeholder="Ex:Amman" />
        <Form.Text className="text-muted">
          write correct name please
        </Form.Text>
      </Form.Group>

      <Button variant="primary" type="submit">
        Search
      </Button>
    </Form>
    <h3>Display name : {this.state.display_name}</h3>
        <p>Lon : {this.state.lon}</p>
        <p>Lat : {this.state.lat}</p>

        {this.state.mapFlag && <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.7aedc85ff3620b0d3b6865ccab5efd25&center=${this.state.lat},${this.state.lon}`} alt="map"></img>}
        {this.state.errFlag && <h4>Error : sorry something went wrong!</h4>}
    </div>
        )
    }
} 
export default Main;