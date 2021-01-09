/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_memcpy.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/10/16 16:40:58 by blaine            #+#    #+#             */
/*   Updated: 2019/10/28 02:29:42 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"

void	*ft_memcpy(void *dest, void *src, size_t len)
{
	int i;

	i = 0;
	if (len > 0 && (dest || src))
	{
		while (len > 0)
		{
			*((char*)dest + i) = *((char*)src + i);
			i++;
			len--;
		}
	}
	return (dest);
}
