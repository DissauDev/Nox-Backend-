// src/utils/validators.js
const { ProductStatus } = require('@prisma/client');

function validateCreate(body = {}) {
  const {
    name, imageUrl, onCarousel,
    shortDescription, longDescription,
    status, sortOrder,
  } = body;

  const errors = [];

  if (typeof name !== 'string' || !name.trim()) {
    errors.push('Name is required');
  }
  if (typeof imageUrl !== 'string' || !imageUrl.trim()) {
    errors.push('imageUrl is required');
  }
  if (onCarousel !== undefined && typeof onCarousel !== 'boolean') {
    errors.push('The field "onCarousel" must be boolean');
  }
  if (typeof shortDescription !== 'string' || !shortDescription.trim()) {
    errors.push('"shortDescription" is required');
  }
  if (typeof longDescription !== 'string' || !longDescription.trim()) {
    errors.push('"longDescription" is required');
  }
  if (status !== undefined && !Object.values(ProductStatus).includes(status)) {
    errors.push(
      `The field "status" must be one of: ${Object.values(ProductStatus).join(', ')}`
    );
  }
  if (sortOrder !== undefined && !Number.isInteger(sortOrder)) {
    errors.push('The field "sortOrder" must be an integer');
  }

  return errors;
}

function validateUpdate(body = {}) {
  const errors = [];
  const { onCarousel, status, sortOrder } = body;

  if ('name' in body && (typeof body.name !== 'string' || !body.name.trim())) {
    errors.push('Name is required');
  }
  if ('imageUrl' in body && (typeof body.imageUrl !== 'string' || !body.imageUrl.trim())) {
    errors.push('imageUrl is required');
  }
  if ('shortDescription' in body && (typeof body.shortDescription !== 'string' || !body.shortDescription.trim())) {
    errors.push('"shortDescription" is required');
  }
  if ('longDescription' in body && (typeof body.longDescription !== 'string' || !body.longDescription.trim())) {
    errors.push('"longDescription" is required');
  }
  if (onCarousel !== undefined && typeof onCarousel !== 'boolean') {
    errors.push('The field "onCarousel" must be boolean');
  }
  if (status !== undefined && !Object.values(ProductStatus).includes(status)) {
    errors.push(
      `The field "status" must be one of: ${Object.values(ProductStatus).join(', ')}`
    );
  }
  if (sortOrder !== undefined && !Number.isInteger(sortOrder)) {
    errors.push('The field "sortOrder" must be an integer');
  }

  return errors;
}

module.exports = { validateCreate, validateUpdate };
