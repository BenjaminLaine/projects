/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_memset.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/10/16 18:02:51 by blaine            #+#    #+#             */
/*   Updated: 2019/10/24 01:17:46 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"

void	*ft_memset(void *dest, int c, size_t len)
{
	int i;

	i = 0;
	while (len > 0)
	{
		*((unsigned char*)dest + i) = (unsigned char)c;
		i++;
		len--;
	}
	return (dest);
}
