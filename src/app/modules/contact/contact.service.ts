import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { contactSearchableFields } from './contact.constant';
import { IContact } from './contact.interface';
import Contact from './contact.model';

const createContact = async (payload: IContact) => {
  const contactData = { ...payload };

  const result = await Contact.create(contactData);
  return result;
};

const getAllContacts = async (query: Record<string, unknown>) => {
  const contactQuery = new QueryBuilder(Contact.find(), query)
    .search(contactSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await contactQuery.countTotal();
  const result = await contactQuery.modelQuery;

  // check no blogs found
  if (!result.length) {
    throw new AppError(404, 'No Contact found!');
  }

  return {
    meta,
    result,
  };
};

export const contactService = {
  createContact,
  getAllContacts,
};
