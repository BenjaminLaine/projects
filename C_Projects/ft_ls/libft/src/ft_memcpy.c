/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_memcpy.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/10/16 16:40:58 by blaine            #+#    #+#             */
/*   Updated: 2020/01/29 18:50:35 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"

void	*ft_memcpy(void *dest, const void *src, size_t len)
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
