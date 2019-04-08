import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    service = new MessageService();
  });

  it('should have no messages to start', () => {
    expect(service.messages.length).toBe(0);
  });
  
  it('add should add a message', () => {
    service.add('message1');

    expect(service.messages.length).toBe(1);
  });

  // PROBLEM 1 - Parsons Problem
  // it('should have 3 messages if starting with 2 when add is called', () => {
  //   service.add('hello there!')
  //   expect(service.messages.length).toBe(3);
  //   service.messages = ['i like bunnies', 'I like pie!'];
  // })
  
  it('clear should remove all messages', () => {
    service.add('message1');
    service.clear();

    expect(service.messages.length).toBe(0);
  });
});
