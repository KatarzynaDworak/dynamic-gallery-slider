# Thanks for viewing my Project ✨

## :star: Demonstration of the Project: ([Dynamic Gallery Slider](https://katarzynadworak.github.io/dynamic-gallery-slider/))
<br />

## Main goal of my work was to:
1. **Interactive UI Elements:** Create dynamic and interactive user interface elements using JavaScript, enhancing user engagement and experience.
2. **Data Handling and Manipulation:** Efficiently manage data through manipulation and processing techniques to ensure optimal performance and functionality.
3. **Event-Driven Programming:** Implement event-driven programming paradigms to respond to user actions and system events seamlessly.
4. **Modular and Scalable Architecture:** Develop a modular and scalable architecture using JavaScript design patterns to facilitate code maintenance and future enhancements.
5. **Responsive Design Integration:** Integrate responsive design principles to ensure compatibility and usability across various devices and screen sizes.
6. **Documentation and Code Quality:** Maintain high-quality code standards and provide comprehensive documentation for easy understanding and collaboration.
<br />

## Solutions provided in the project
**1. Interactive UI Elements:**
Example: Implementing a carousel/slider functionality with smooth transitions and interactive controls.

   const initSlider = function() {
       const sliderItems = document.querySelectorAll('.slider-item');
       const nextBtn = document.querySelector('.next-btn');
       const prevBtn = document.querySelector('.prev-btn');
       
       let currentIndex = 0;
       
       nextBtn.addEventListener('click', () => {
           currentIndex = (currentIndex + 1) % sliderItems.length;
           updateSlider();
       });
       
       prevBtn.addEventListener('click', () => {
           currentIndex = (currentIndex - 1 + sliderItems.length) % sliderItems.length;
           updateSlider();
       });
       
       function updateSlider() {
           sliderItems.forEach((item, index) => {
               item.style.display = index === currentIndex ? 'block' : 'none';
           });
       }
       
       updateSlider();
   }
   
   document.addEventListener('DOMContentLoaded', initSlider);

**2. Data Handling and Manipulation:**
Example: Filtering and manipulating arrays of data based on user input or predefined conditions.

      const data = [
          { id: 1, name: 'John', age: 30 },
          { id: 2, name: 'Jane', age: 25 },
          { id: 3, name: 'Doe', age: 35 }
      ];
      
      const filteredData = data.filter(item => item.age > 30);
      console.log(filteredData);
      Event-Driven Programming:
      
      Example: Handling form submissions and validating user inputs using event listeners.
      javascript
      Skopiuj kod
      const form = document.querySelector('form');
      
      form.addEventListener('submit', function(event) {
          event.preventDefault();
          const formData = new FormData(this);
          const username = formData.get('username');
          const password = formData.get('password');
          
          // Validate username and password
          if (username && password) {
              // Process form data
              console.log('Username:', username);
              console.log('Password:', password);
          } else {
              console.error('Invalid username or password');
          }
      });
**3. Modular and Scalable Architecture:***
Example: Using ES6 modules or JavaScript classes to encapsulate functionality and promote code reusability.

      // Module 1: Utilities.js
      export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
      
      // Module 2: User.js
      import { capitalize } from './Utilities.js';
      
      export class User {
          constructor(name) {
              this.name = capitalize(name);
          }
          
          greet() {
              console.log(`Hello, ${this.name}!`);
          }
      }
      
      // Usage
      import { User } from './User.js';
      
      const user1 = new User('john');
      user1.greet(); // Output: Hello, John!
   
**4. Responsive Design Integration:**
Example: Using CSS media queries and JavaScript to adapt the layout and behavior based on screen size.

      /* styles.css */
      @media screen and (max-width: 768px) {
          .container {
              flex-direction: column;
          }
      }

**5. Documentation and Code Quality:**
Example: Providing clear comments, README files, and inline documentation to enhance code readability and facilitate collaboration.
javascript

   // Function to calculate factorial
   const factorial = (n) => {
       // Check for negative numbers
       if (n < 0) {
           throw new Error('Factorial of negative numbers is undefined');
       }
       
       // Base case: factorial of 0 is 1
       if (n === 0) {
           return 1;
       }
       
       // Recursive case
       return n * factorial(n - 1);
   }
<br />
<br />

## 🛠️ Languages and Tools used: 

<img align="left" alt="JavaScript" width="50px" src="https://raw.githubusercontent.com/github/explore/379d8d145b878a5b7a1c2a5b5800b1d82d5c8c8f/topics/javascript/javascript.png" />

<img align="left" alt="HTML5" width="50px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/html/html.png" />

<img align="left" alt="CSS3" width="50px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/css/css.png" />

<img align="left" alt="Git" width="50px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/git/git.png" />

<img align="left" alt="GitHub" width="50px" src="https://raw.githubusercontent.com/github/explore/78df643247d429f6cc873026c0622819ad797942/topics/github/github.png" />

<img align="left" alt="Terminal" width="50px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/terminal/terminal.png" />

<img align="left" alt="Visual Studio Code" width="50px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/visual-studio-code/visual-studio-code.png" />

<br />
<br />
<br />
<br />

## :blue_heart:  You can find me on:
<br/>

[<img align="left" alt="Mateusz Sowa LinkedIn" width="22px" src="https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/linkedin.svg" />](https://www.linkedin.com/in/katarzynadworakk/)

 
<br />
