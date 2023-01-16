const modal = {

     init() {

          // Store all the modal trigger element
          const triggers = document.querySelectorAll('[data-component-trigger="modal"]');

          if(triggers.length) {

               triggers.forEach((trigger) => {

                    trigger.addEventListener('click', () => {

                         //Store the modal ID
                         const modalId = trigger.dataset.componentId;
                         
                         //Store the modal Element
                         const modal = document.querySelector(modalId);

                         if(modal) {

                              // Store all dissmissable buttons from modal
                              const dismisses = modal.querySelectorAll('[data-component-dismisss="modal"]')
                              
                              // Open the modal
                              this.open(modal);

                              // Check the modal contains any dismissable button
                              if(dismisses.length) {

                                   // Close the modal when clicks one of the dismissable buttons
                                   dismisses.forEach((dismisse) => dismisse.addEventListener('click', () => this.close(modal)))
                              }

                              //Get the modal's backdrop value
                              const backdrop = modal.dataset.componentBackdrop ? modal.dataset.componentBackdrop : 'true';

                              // Check if backdrop is enabled
                              if(backdrop === 'true') {

                                   // Close the modal when press the esc key
                                   document.addEventListener('keydown', (e) => {

                                        if (e.key == 'Escape' && modal.classList.contains('show')) {

                                             this.close(modal);
                                        }
                                   })
                              }
                              
                         }
                    });
               });
          }
     },

     open(modal) {  

          if(!modal.classList.contains('show')) {
               
               // Change the display property none to flex
               modal.style.display = 'flex';
               
               // Create a modal overlay
               const overlay = this.createHTMLTag('div', {
                    class: 'modal-backdrop'
               });

               // Remove overlay if it exists
               if(modal.querySelector('.modal-backdrop')) {

                    modal.querySelector('.modal-backdrop').remove();
               }
               
               setTimeout(() => {

                    // Add the show class to the modal
                    modal.classList.add('show');

                    // Append the overlay
                    modal.appendChild(overlay);

                    // check if backdrop is enabled
                    overlay.addEventListener('click', () => {

                         //Get the modal's backdrop value
                         const backdrop = modal.dataset.componentBackdrop ? modal.dataset.componentBackdrop : 'true';

                         if(backdrop === 'true') {

                              this.close(modal);
                         }

                    });

               }, 15);
          }
     },

     close(modal) {

          if(modal.classList.contains('show')) {
               
               modal.classList.remove('show');

               setTimeout(() => {

                    // Remove the style attribute to make display none
                    modal.removeAttribute('style');

                    // Remove the backdrop from modal
                    modal.querySelector('.modal-backdrop').remove();

               }, 300)
          }

     },

     createHTMLTag(tag, attributes = {}) {

          //Create the tag
          const element = document.createElement(tag);

          // Check if attrbutes is empty of not
          if(Object.keys(attributes).length) {

               for(const key in attributes) {

                    //Set each attribute
                     element.setAttribute(key, attributes[key]);
               }
          }

          // Return the element
          return element;
     }
}

export default modal;