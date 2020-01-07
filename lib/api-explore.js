import 'isomorphic-unfetch' // eslint-disable-line import/no-unassigned-import
import getConfig from 'next/config'

import HttpError from './http-error'

const {publicRuntimeConfig} = getConfig()

export const API_EXPLORE = publicRuntimeConfig.API_EXPLORE || 'https://sandbox.geo.api.gouv.fr/explore'
export const API_ADRESSE = publicRuntimeConfig.API_ADRESSE || 'https://api-adresse.data.gouv.fr'

function checkIdVoie(idVoie) {
  return Boolean(idVoie.match(/^([a-z0-9]{5})_(([a-z0-9]{4})|([a-z0-9]{6}))$/i))
}

export async function _fetch(url) {
  const options = {
    mode: 'cors',
    method: 'GET'
  }

  const response = await fetch(url, options)
  const contentType = response.headers.get('content-type')

  if (!response.ok) {
    throw new HttpError(response)
  }

  if (response.ok && contentType && contentType.includes('application/json')) {
    return response.json()
  }

  throw new Error('Une erreur est survenue')
}

export function search(input) {
  return _fetch(`${API_ADRESSE}/search?q=${encodeURIComponent(input)}`)
}

export function getNumerosBbox(codeCommune, bbox) {
  return _fetch(`${API_EXPLORE}/${codeCommune}/numeros?bbox=${bbox}`)
}

export function getCommune(codeCommune) {
  return _fetch(`${API_EXPLORE}/${codeCommune}`)
}

export function getVoie(idVoie) {
  const isValid = checkIdVoie(idVoie)
  return isValid ? _fetch(`${API_EXPLORE}/${idVoie.replace('_', '/')}`) : null
}

export function getNumero(idVoie, numeroComplet) {
  const [, numero, suffixe] = numeroComplet.match(/^(\d+)(\w*)$/)
  const isValid = checkIdVoie(idVoie)

  return isValid ? _fetch(`${API_EXPLORE}/${idVoie.replace('_', '/')}/${numero}${suffixe || ''}`) : null
}

export function getDepartements() {
  return _fetch(`${API_EXPLORE}/france`)
}

export function getDepartementCommunes(codeDepartement) {
  const url = `${API_EXPLORE}/departement/${codeDepartement}`
  return _fetch(url)
}
