import { Component, OnInit } from '@angular/core';
interface CustomWindow extends Window {
  embeddedChatbotConfig?: {
    chatbotId: string;
    domain: string;
  };
}

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.css']
})
export class DashboardUserComponent {


  constructor() {
    const customWindow: CustomWindow = window;

    customWindow.embeddedChatbotConfig = {
      chatbotId: 'O55TYvzIY_au8HQ1xLyrO',
      domain: 'www.chatbase.co',
    };

    const script = document.createElement('script');
    script.src = 'https://www.chatbase.co/embed.min.js';
    script.setAttribute('chatbotId', 'O55TYvzIY_au8HQ1xLyrO');
    script.setAttribute('domain', 'www.chatbase.co');
    script.defer = true;

    script.onload = () => {
      console.log('Chatbase script loaded successfully!');
      // Perform additional actions if needed
    };

    script.onerror = (error) => {
      console.error('Error loading Chatbase script:', error);
    };

    document.head.appendChild(script);
  }

}
