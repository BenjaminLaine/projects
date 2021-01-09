/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_memset.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/10/16 18:02:51 by blaine            #+#    #+#             */
/*   Updated: 2020/01/29 18:50:24 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"

void	*ft_memset(void *dest, int c, size_t len)
{
	while (len-- > 0)
		*((unsigned char*)dest + len) = (unsigned char)c;
	return (dest);
}
