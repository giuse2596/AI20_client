export class Request{
    proposer: string;
    nameGroup: string;
    course: string;
    timeoutMillis: number;
    members: string[];
    accepted: Map<string, boolean>;

  constructor(proposer: string, nameGroup: string, members: string[], course: string, timeoutMillis: number){
    this.proposer = proposer;
    this.nameGroup = nameGroup;
    this.course = course;
    this.timeoutMillis = timeoutMillis;
    this.members = members;
    for (const member of members) {
      this.accepted.set(member, false);
    }
  }
}
