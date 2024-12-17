class HttpClient {
  baseUrl: string = process.env.NEXT_PUBLIC_API || '';
  accessToken?: string;

  baseHeader = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + this.accessToken,
  };

  setToken(token: string) {
    this.accessToken = token;
    this.baseHeader['Authorization'] = 'Bearer ' + token;
  }

  createFullUrl(url: string, params: Record<string, any>): string {
    const queryString = Object.entries(params)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join('&');

    return `${url}?${queryString}`;
  }

  async get(endpoint: string, params?: any, opts?: any) {
    if (endpoint[0] != '/') {
      endpoint = '/' + endpoint;
    }

    let url = this.baseUrl + endpoint;

    if (params) {
      url = this.createFullUrl(url, params);
    }

    try {
      const result = await fetch(url, {
        method: 'GET',
        headers: {
          ...this.baseHeader,
        },
        ...opts,
      });
  
      if (!result.ok) {
        throw await result.json();
      }
  
      return result.json();
    } catch (e) {
      console.log('loiii roiiii', e)
    }
  }

  async post(endpoint: string, body: any, opts?: any) {
    const url = this.baseUrl + endpoint;

    const result = await fetch(url, {
      method: 'POST',
      headers: {
        ...this.baseHeader,
      },
      body: JSON.stringify(body),
      ...opts,
    });

    if (!result.ok) {
      throw await result.json();
    }

    return result.json();
  }

  async put(endpoint: string, body: any, opts?: any) {
    let url = this.baseUrl + endpoint;

    if (opts.id) {
      url += `/${opts.id}`;
    }

    const result = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        ...this.baseHeader,
      },
      ...opts,
    });

    if (!result.ok) {
      throw await result.json();
    }

    return result.json();
  }

  async delete(endpoint: string, opts?: any) {
    let url = this.baseUrl + endpoint;

    if (opts.id) {
      url += `/${opts.id}`;
    }

    const result = await fetch(url, {
      method: 'DELETE',
      headers: {
        ...this.baseHeader,
      },
      ...opts,
    });

    if (!result.ok) {
      throw await result.json();
    }

    return result.json();
  }
}

export const httpClient = new HttpClient();
