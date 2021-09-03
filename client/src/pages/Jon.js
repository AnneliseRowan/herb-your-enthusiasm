import React, { useState, useEffect } from 'react';

import { useQuery } from '@apollo/client';

import { QUERY_PLANT } from '../utils/queries';

const Jon = () => {

    const { loading, error, data } = useQuery(QUERY_PLANT)

    if (loading) return 'Loading...';
    if (error) return `Error ! ${error.message}`

    return(`
        <h1>Jon's page check console</h1>
        
        `
    )
}

export default Jon;