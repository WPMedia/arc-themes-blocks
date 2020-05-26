# `@wpmedia/event-tester-block`

Fusion News Theme event tester block

## Usage

Used for testing the event emitter.  When new events are created, they should be subscribed to in this 
component in the constructor.  When this component is added to a page, it will not render anything visually.
It will console.log a message altering you what event has been consumed and also dump our the event object that can be 
inspected to ensure the correct data was captured. 
