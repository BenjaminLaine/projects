/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_memccpy.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/10/16 17:51:27 by blaine            #+#    #+#             */
/*   Updated: 2019/10/24 04:09:58 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"

void	*ft_memccpy(void *dest, const void *src, int c, size_t n)
{
	int i;

	i = 0;
	while (n > 0)
	{
		*((char*)dest + i) = *((char*)src + i);
		if (*((unsigned char*)src + i) == (unsigned char)c)
			return (dest + i + 1);
		i++;
		n--;
	}
	return (NULL);
}
