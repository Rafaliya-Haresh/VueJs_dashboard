import moment from 'moment';

/* n: number */
export const formatPercentage = (n) => {
  if (n % 1 !== 0) {
    return n.toFixed(1);
  }
  return n;
};

/* dateStr: string */
export const isFutureDate = (dateStr) => {
  const selectedDate = moment(dateStr);
  return moment().diff(selectedDate) < 0;
};

/* month Array */
export const getMonthDay = () => ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

/* str: string */
/* returns string | null */
export const capitalize = (str) => {
  if (typeof str === 'string') {
    return `${str[0].toUpperCase()}${str.slice(1)}`;
  }
  return null;
};

/* firstName: string, lastName: string */
export const fullName = (firstName, lastName) => {
  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  }
  return '-';
};

/* status: 'draft' | 'sent' | 'scheduled', statusDate: string, */
export const formatStatus = (status, statusDate) => {
  switch (status) {
    case 'draft':
      return 'Draft';
    case 'sent':
      return `Sent on ${statusDate}`;
    case 'scheduled':
      return `Scheduled for ${statusDate}`;
    default:
      return '';
  }
};

/* seconds: number */
/* returns string */
export const formatDuration = (seconds) => `${Math.floor(seconds / 60)}:${seconds % 60}`;

export const Modal = Object.freeze({
  Video: 0,
  Contact: 1,
  Tag: 2,
  CampaignMessage: 3,
  Campaign: 4,
  AddToCampaign: 5,
  HeaderModal: 6,
  MessagePreview: 7,
});

export const Header = Object.freeze({
  FirstName: 'first_name',
  LastName: 'last_name',
  Address1: 'address_1',
  Address2: 'address_2',
  City: 'city',
  State: 'state',
  ZipCode: 'zip_code',
  Text: 'text',
  PhoneNumber: 'phone_number',
  Email: 'email',
});
