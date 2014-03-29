    var controller = new Leap.Controller();

    /*
      The leapToScene function takes a position in leap space 
      and converts it to the space in the canvas.
    */
    function leapToScene( frame , leapPos ){

      // Gets the interaction box of the current frame
      var iBox = frame.interactionBox;

      // Gets the left border and top border of the box
      // In order to convert the position to the proper
      // location for the canvas
      var left = iBox.center[0] - iBox.size[0]/2;
      var top = iBox.center[1] + iBox.size[1]/2;

      // Takes our leap coordinates, and changes them so
      // that the origin is in the top left corner 
      var x = leapPos[0] - left;
      var y = leapPos[1] - top;

      // Divides the position by the size of the box
      // so that x and y values will range from 0 to 1
      // as they lay within the interaction box
      x /= iBox.size[0];
      y /= iBox.size[1];

      // Uses the height and width of the canvas to scale
      // the x and y coordinates in a way that they 
      // take up the entire canvas
      x *= width;
      y *= height;

      // Returns the values, making sure to negate the sign 
      // of the y coordinate, because the y basis in canvas 
      // points down instead of up
      return [ x , -y ];

    }

    var x_position = 0;
   
    controller.on( 'frame' , function(frame){

      // We only look at one hand
      var hand = frame.hands[0];

      // and get its position, so that it can be passed through
      // for drawing the connections
      var handPos = leapToScene( frame , hand.palmPosition );

      x_position = handPos[0];
      console.log (x_position);
    
    });
	 
	controller.connect();