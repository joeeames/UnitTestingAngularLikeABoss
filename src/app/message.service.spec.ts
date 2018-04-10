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
  
  it('clear should remove all messages', () => {
    service.add('message1');
    service.clear();

    expect(service.messages.length).toBe(0);
  });
});
